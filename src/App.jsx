import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EditArticle from './pages/EditArticle';
import NewArticle from './pages/NewArticle';
import ViewArticle from './pages/ViewArticle';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './logo.jpg';
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getAvailableTags,
} from './api/mockApi';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(storedUser);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{ background: '#2196f3', color: '#fff' }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Avatar src={logo} alt="Logo" style={{ marginRight: 16 }} />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Article Management System
          </Typography>
          {user && (
            <Box mr={2} display="flex" alignItems="center">
              <Avatar style={{ marginRight: 8 }} />
              <Typography variant="body1">{user.username}</Typography>
            </Box>
          )}
          {user ? (
            <Button
              variant="outlined"
              style={{ color: '#fff', borderColor: '#fff' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="outlined"
              style={{ color: '#fff', borderColor: '#fff' }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route
              path="dashboard"
              element={
                <Dashboard
                  getArticles={getArticles}
                  deleteArticle={deleteArticle}
                />
              }
            />
            <Route
              path="edit/:title"
              element={
                <EditArticle
                  getArticleById={getArticleById}
                  updateArticle={updateArticle}
                />
              }
            />
            <Route
              path="new-article"
              element={
                <NewArticle
                  createArticle={createArticle}
                  getAvailableTags={getAvailableTags}
                />
              }
            />
            <Route
              path="view/:title"
              element={<ViewArticle getArticleById={getArticleById} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
