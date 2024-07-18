import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ViewArticle from '../pages/ViewArticle';
import * as mockApi from '../api/mockApi';

jest.mock('../api/mockApi');

const mockArticle = {
  id: 1,
  title: 'Introduction to React',
  content: 'This is the content of the first article.',
  tags: ['react', 'javascript'],
  author: 'John Doe',
  email: 'johndoe@example.com',
};

beforeEach(() => {
  mockApi.getArticles.mockResolvedValue([mockArticle]);
});

test('renders article details', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/view/introduction-to-react']}>
        <Routes>
          <Route path="/view/:title" element={<ViewArticle />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  const articleTitle = await screen.findByRole('heading', {
    name: /Introduction to React/i,
  });
  const articleContent = await screen.findByText(
    /This is the content of the first article./i,
  );
  const articleAuthor = await screen.findByText(/Author: John Doe/i);
  const articleEmail = await screen.findByText(/Email: johndoe@example.com/i);
  const articleTags = await screen.findByText(/Tags: react, javascript/i);

  expect(articleTitle).toBeInTheDocument();
  expect(articleContent).toBeInTheDocument();
  expect(articleAuthor).toBeInTheDocument();
  expect(articleEmail).toBeInTheDocument();
  expect(articleTags).toBeInTheDocument();
});

test('shows loading state initially', async () => {
  render(
    <MemoryRouter initialEntries={['/view/introduction-to-react']}>
      <Routes>
        <Route path="/view/:title" element={<ViewArticle />} />
      </Routes>
    </MemoryRouter>,
  );

  await waitFor(() =>
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument(),
  );
});
