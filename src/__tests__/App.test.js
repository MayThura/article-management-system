import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { authenticateUser, getArticles } from '../api/mockApi';

jest.mock('../api/mockApi');
jest.mock('../logo.jpg', () => '');

const mockUser = { id: 1, username: 'admin1', password: 'pswd123' };

beforeEach(() => {
  localStorage.clear();
  getArticles.mockResolvedValue([]);
  authenticateUser.mockResolvedValue({ token: 'dummy-token', user: mockUser });
});

test('renders app bar with title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const linkElement = screen.getByText(/Article Management System/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders login button when not authenticated', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});

test('renders logout button when authenticated', () => {
  localStorage.setItem('user', JSON.stringify(mockUser));
  localStorage.setItem('token', 'dummy-token');

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const logoutButton = screen.getByRole('button', { name: /logout/i });
  expect(logoutButton).toBeInTheDocument();
});

test('logs out user and clears localStorage', () => {
  localStorage.setItem('user', JSON.stringify(mockUser));
  localStorage.setItem('token', 'dummy-token');

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const logoutButton = screen.getByRole('button', { name: /logout/i });
  fireEvent.click(logoutButton);

  expect(localStorage.getItem('user')).toBeNull();
  expect(localStorage.getItem('token')).toBeNull();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
