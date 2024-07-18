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
  {
    id: 6,
    title: 'Understanding TypeScript',
    content: 'TypeScript extends JavaScript by adding types...',
    author: 'Chris Lee',
    email: 'chrislee@example.com',
    tags: ['typescript', 'javascript'],
  },
  {
    id: 7,
    title: 'CSS Grid Layout',
    content:
      'CSS Grid Layout is a two-dimensional layout system for the web...',
    author: 'Jessica White',
    email: 'jessicawhite@example.com',
    tags: ['css', 'web design'],
  },
  {
    id: 8,
    title: 'Mastering GraphQL',
    content: 'GraphQL is a query language for your API...',
    author: 'David Kim',
    email: 'davidkim@example.com',
    tags: ['graphql', 'api'],
  },
  {
    id: 9,
    title: 'Docker for Beginners',
    content:
      'Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers...',
    author: 'Laura Green',
    email: 'lauragreen@example.com',
    tags: ['docker', 'containers'],
  },
  {
    id: 10,
    title: 'Building Progressive Web Apps',
    content:
      'Progressive Web Apps (PWAs) are web apps that use modern web capabilities to deliver an app-like experience to users...',
    author: 'Michael Brown',
    email: 'michaelbrown@example.com',
    tags: ['pwa', 'web development'],
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
  'typescript',
  'css',
  'web design',
  'graphql',
  'api',
  'docker',
  'containers',
  'pwa',
  'web development',
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
