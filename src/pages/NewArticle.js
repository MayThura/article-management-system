import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle, getAvailableTags } from '../api/mockApi';
import ArticleForm from '../components/ArticleForm';

const NewArticle = ({ createArticle, getAvailableTags }) => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    createArticle(values).then(() => {
      navigate('/dashboard');
    });
  };

  const initialValues = {
    title: '',
    content: '',
    tags: [],
    author: '',
    email: '',
  };

  return <ArticleForm initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default NewArticle;
