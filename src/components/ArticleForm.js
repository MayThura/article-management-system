import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Chip,
  Autocomplete,
  IconButton,
  Typography,
} from '@mui/material';
import { getAvailableTags } from '../api/mockApi';

const ArticleForm = ({ initialValues, onSubmit, isEditing }) => {
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    getAvailableTags().then(setAvailableTags);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is Required'),
      content: Yup.string().required('Content is Required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is Required'),
      author: Yup.string().required('Author is Required'),
    }),
    onSubmit,
  });

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {isEditing ? 'Edit Article' : 'New Article'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Autocomplete
          multiple
          freeSolo
          forcePopupIcon
          options={availableTags}
          value={formik.values.tags}
          onChange={(event, value) => formik.setFieldValue('tags', value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return <Chip key={key} label={option} {...tagProps} />;
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type and enter to add custom tags or choose from the list."
              name="tags"
              error={formik.touched.tags && Boolean(formik.errors.tags)}
              helperText={formik.touched.tags && formik.errors.tags}
              fullWidth
              margin="normal"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    <IconButton
                      onClick={() =>
                        formik.setFieldValue('tags', [
                          ...formik.values.tags,
                          params.inputProps.value,
                        ])
                      }
                    ></IconButton>
                  </>
                ),
              }}
            />
          )}
        />
        <TextField
          label="Author"
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ArticleForm;
