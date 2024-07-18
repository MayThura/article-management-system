import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from '../components/ArticleList';
import DeleteConfirmation from '../components/DeleteConfirmation';
import { Button, Typography } from '@mui/material';

const Dashboard = ({ getArticles, deleteArticle }) => {
  const [articles, setArticles] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const articles = await getArticles();
    setArticles(articles);
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(deleteId);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== deleteId),
      );
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

  const onDelete = (id) => {
    setDeleteId(id);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/new-article')}
        style={{ marginBottom: '1rem' }}
      >
        Add New Article
      </Button>
      <ArticleList articles={articles} onDelete={onDelete} />
      <DeleteConfirmation
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
