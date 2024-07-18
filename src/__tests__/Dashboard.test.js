import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import * as mockApi from '../api/mockApi';

jest.mock('../api/mockApi');

const mockArticles = [
  {
    id: 1,
    title: 'Advanced Python Techniques',
    content: 'Content',
    tags: ['python'],
    author: 'Jane Smith',
    email: 'janesmith@example.com',
  },
  {
    id: 2,
    title: 'Introduction to React',
    content: 'Content',
    tags: ['react'],
    author: 'John Doe',
    email: 'johndoe@example.com',
  },
];

beforeEach(() => {
  mockApi.getArticles.mockResolvedValue(mockArticles);
  mockApi.deleteArticle.mockResolvedValue({});
});

test('renders dashboard with articles', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Dashboard
          getArticles={mockApi.getArticles}
          deleteArticle={mockApi.deleteArticle}
        />
      </BrowserRouter>,
    );
  });

  await waitFor(() => {
    expect(screen.getByText(/Advanced Python Techniques/i)).toBeInTheDocument();
    expect(screen.getByText(/Introduction to React/i)).toBeInTheDocument();
  });
});

test('deletes an article', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Dashboard
          getArticles={mockApi.getArticles}
          deleteArticle={mockApi.deleteArticle}
        />
      </BrowserRouter>,
    );
  });

  await waitFor(() => {
    expect(screen.getByText(/Advanced Python Techniques/i)).toBeInTheDocument();
    expect(screen.getByText(/Introduction to React/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByLabelText(/delete/i)[0]);

  await waitFor(() => {
    expect(
      screen.getByText(/are you sure you want to delete/i),
    ).toBeInTheDocument();
  });

  const deleteConfirmationDialog = screen.getByRole('dialog');

  const yesButton = within(deleteConfirmationDialog).getByText(/yes/i);
  fireEvent.click(yesButton);

  expect(mockApi.deleteArticle).toHaveBeenCalledWith(1);

  await waitForElementToBeRemoved(() =>
    screen.getByText(/Advanced Python Techniques/i),
  );

  await act(async () => {
    await waitFor(() => {
      expect(
        screen.queryByText(/Advanced Python Techniques/i),
      ).not.toBeInTheDocument();
    });
  });
});

test('navigates to add new article page', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Dashboard
          getArticles={mockApi.getArticles}
          deleteArticle={mockApi.deleteArticle}
        />
      </BrowserRouter>,
    );
  });

  fireEvent.click(screen.getByText(/add new article/i));

  expect(global.window.location.pathname).toEqual('/new-article');
});
