import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles } from '../api/mockApi';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';

const ViewArticle = () => {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const articles = await getArticles();
      const foundArticle = articles.find(
        (a) => a.title.toLowerCase().split(' ').join('-') === title,
      );
      setArticle(foundArticle);
      setLoading(false);
    };

    fetchArticle();
  }, [title]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
        <Typography data-testid="Loading..." variant="h6" ml={2}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return article ? (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {article.content}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Author: {article.author} | Email: {article.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Tags: {article.tags.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  ) : (
    <div>No article found</div>
  );
};

export default ViewArticle;
