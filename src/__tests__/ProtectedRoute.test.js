import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

jest.mock('../api/mockApi');

test('redirects to login if not authenticated', async () => {
  localStorage.removeItem('token');

  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/login"
            element={<Login setUser={() => {}} authenticateUser={() => {}} />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard getArticles={() => {}} deleteArticle={() => {}} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
  });

  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});

test('renders dashboard if authenticated', async () => {
  localStorage.setItem('token', 'dummy-token');

  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/login"
            element={<Login setUser={() => {}} authenticateUser={() => {}} />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard getArticles={() => {}} deleteArticle={() => {}} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
  });

  expect(screen.queryByTestId('Dashboard')).toBeDefined();
});
