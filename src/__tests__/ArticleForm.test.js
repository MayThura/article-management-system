import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import ArticleForm from '../components/ArticleForm';
import * as mockApi from '../api/mockApi';

jest.mock('../api/mockApi');

const mockTags = ['react', 'javascript', 'node'];

beforeEach(() => {
  mockApi.getAvailableTags.mockResolvedValue(mockTags);
});

test('renders article form with initial values', async () => {
  const initialValues = {
    title: '',
    content: '',
    tags: [],
    author: '',
    email: '',
  };

  await act(async () => {
    render(<ArticleForm initialValues={initialValues} onSubmit={() => {}} />);
  });

  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test('validates form fields and shows errors', async () => {
  const initialValues = {
    title: '',
    content: '',
    tags: [],
    author: '',
    email: '',
  };
  const handleSubmit = jest.fn();

  await act(async () => {
    render(
      <ArticleForm initialValues={initialValues} onSubmit={handleSubmit} />,
    );
  });

  fireEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/content is required/i)).toBeInTheDocument();
  });

  expect(handleSubmit).not.toHaveBeenCalled();
});

test('submits form with valid data', async () => {
  const initialValues = {
    title: 'Test Title',
    content: 'Test Content',
    tags: ['react'],
    author: 'Test Author',
    email: 'test@example.com',
  };
  const handleSubmit = jest.fn();

  await act(async () => {
    render(
      <ArticleForm initialValues={initialValues} onSubmit={handleSubmit} />,
    );
  });

  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: 'Updated Title' },
  });
  fireEvent.change(screen.getByLabelText(/content/i), {
    target: { value: 'Updated Content' },
  });
  fireEvent.change(screen.getByLabelText(/author/i), {
    target: { value: 'Updated Author' },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'updated@example.com' },
  });
  fireEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit.mock.calls[0][0]).toEqual({
      title: 'Updated Title',
      content: 'Updated Content',
      tags: ['react'],
      author: 'Updated Author',
      email: 'updated@example.com',
    });
  });
});

test('adds new tag to the tags field', async () => {
  const initialValues = {
    title: 'Test Title',
    content: 'Test Content',
    tags: ['react'],
    author: 'Test Author',
    email: 'test@example.com',
  };
  const handleSubmit = jest.fn();

  await act(async () => {
    render(
      <ArticleForm initialValues={initialValues} onSubmit={handleSubmit} />,
    );
  });

  fireEvent.change(screen.getByLabelText(/tags/i), {
    target: { value: 'new-tag' },
  });
  fireEvent.keyDown(screen.getByLabelText(/tags/i), { key: 'Enter' });

  await waitFor(() => {
    expect(screen.getByText('new-tag')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit.mock.calls[0][0]).toEqual({
      title: 'Test Title',
      content: 'Test Content',
      tags: ['react', 'new-tag'],
      author: 'Test Author',
      email: 'test@example.com',
    });
  });
});
