let articles = [
  {
    id: 1,
    title: 'Introduction to React',
    content: 'React is a JavaScript library for building user interfaces...',
    author: 'John Doe',
    email: 'johndoe@example.com',
    tags: ['react', 'javascript'],
  },
  {
    id: 2,
    title: 'Advanced Python Techniques',
    content:
      'In this article, we will explore some advanced features of Python...',
    author: 'Jane Smith',
    email: 'janesmith@example.com',
    tags: ['python', 'java'],
  },
  {
    id: 3,
    title: 'Fashion Trends 2023',
    content: 'Fashion trends for 2023 include vibrant colors, bold patterns...',
    author: 'Alice Johnson',
    email: 'alicejohnson@example.com',
    tags: ['fashion', 'clothing'],
  },
  {
    id: 4,
    title: 'Node.js Performance Tips',
    content:
      'Node.js is a powerful tool for building server-side applications...',
    author: 'Robert Brown',
    email: 'robertbrown@example.com',
    tags: ['node', 'express'],
  },
  {
    id: 5,
    title: 'Java Basics for Beginners',
    content:
      'Java is a popular programming language used for building cross-platform applications...',
    author: 'Emily Davis',
    email: 'emilydavis@example.com',
    tags: ['java', 'programming'],
  },
];

const users = [
  { id: 1, username: 'admin1', password: 'pswd123' },
  { id: 2, username: 'admin2', password: 'pswd456' },
];

const availableTags = [
  'react',
  'javascript',
  'node',
  'express',
  'python',
  'java',
  'fashion',
  'clothing',
  'programming',
];

const mockFetch = (data, shouldReject = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(data));
      } else {
        resolve(data);
      }
    }, 500);
  });
};

export const authenticateUser = (username, password) => {
  const user = users.find(
    (user) => user.username === username && user.password === password,
  );
  return mockFetch(
    user ? { token: 'dummy-token', user } : 'Invalid username or password',
    !user,
  );
};

export const getArticles = () => {
  return mockFetch([...articles]);
};

export const getArticleById = (id) => {
  const article = articles.find((article) => article.id === id);
  return mockFetch(article || 'Article not found', !article);
};

export const createArticle = (article) => {
  article.id = articles.length + 1;
  articles.push(article);
  return mockFetch(article);
};

export const updateArticle = (id, updatedArticle) => {
  const index = articles.findIndex((article) => article.id === id);
  if (index !== -1) {
    articles[index] = { ...articles[index], ...updatedArticle };
    return mockFetch(articles[index]);
  } else {
    return mockFetch('Article not found', true);
  }
};

export const deleteArticle = (id) => {
  const index = articles.findIndex((article) => article.id === id);
  if (index !== -1) {
    articles = articles.filter((article) => article.id !== id);
    return mockFetch();
  } else {
    return mockFetch('Article not found', true);
  }
};

export const getAvailableTags = () => {
  return mockFetch([...availableTags]);
};
