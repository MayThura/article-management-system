import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Container,
  Alert,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { authenticateUser } from '../api/mockApi';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await authenticateUser(
          values.username,
          values.password,
        );
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Card
        style={{
          marginTop: '64px',
          padding: '32px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Welcome Back!
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Please login to your account.
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {error && (
              <Box mt={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#2196f3',
                color: '#fff',
              }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
