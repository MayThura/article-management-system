import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import * as mockApi from '../api/mockApi';

jest.mock('../api/mockApi');

test('renders login form', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Login setUser={() => {}} authenticateUser={mockApi.authenticateUser} />
      </BrowserRouter>,
    );
  });

  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('shows error on invalid login', async () => {
  mockApi.authenticateUser.mockRejectedValue(
    new Error('Invalid username or password'),
  );

  await act(async () => {
    render(
      <BrowserRouter>
        <Login setUser={() => {}} authenticateUser={mockApi.authenticateUser} />
      </BrowserRouter>,
    );
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'invaliduser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'invalidpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });

  await waitFor(() => {
    expect(
      screen.getByText(/invalid username or password/i),
    ).toBeInTheDocument();
  });
});

test('successful login sets user and token', async () => {
  const mockUser = { id: 1, username: 'testuser' };
  mockApi.authenticateUser.mockResolvedValue({
    token: 'dummy-token',
    user: mockUser,
  });

  const setUser = jest.fn();

  await act(async () => {
    render(
      <BrowserRouter>
        <Login setUser={setUser} authenticateUser={mockApi.authenticateUser} />
      </BrowserRouter>,
    );
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });

  await waitFor(() => {
    expect(localStorage.getItem('token')).toBe('dummy-token');
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    expect(setUser).toHaveBeenCalledWith(mockUser);
  });
});
