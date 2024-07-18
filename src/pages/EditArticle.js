import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticles, updateArticle } from '../api/mockApi';
import ArticleForm from '../components/ArticleForm';

const EditArticle = () => {
  const { id, title } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticles().then((articles) => {
      const article = articles.find(
        (a) => a.title.toLowerCase().split(' ').join('-') === title,
      );
      setArticle(article);
    });
  }, [title]);

  const handleSubmit = (values) => {
    if (article) {
      updateArticle(article.id, values)
        .then(() => {
          navigate('/dashboard');
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  return article ? (
    <ArticleForm initialValues={article} onSubmit={handleSubmit} isEditing />
  ) : (
    <div>Loading...</div>
  );
};

export default EditArticle;
