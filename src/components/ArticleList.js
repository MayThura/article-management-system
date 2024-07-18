import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Paper,
  IconButton,
  TextField,
  TablePagination,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, Link } from 'react-router-dom';

const ArticleList = ({ articles, onDelete }) => {
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(0);
  }, [articles]);

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.author.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedArticles = filteredArticles.sort((a, b) => {
    const aField = a[sortField].toLowerCase();
    const bField = b[sortField].toLowerCase();
    if (aField < bField) return sortOrder === 'asc' ? -1 : 1;
    if (aField > bField) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const formatTitleForUrl = (title) => {
    return title.toLowerCase().split(' ').join('-');
  };

  return (
    <Paper>
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: '10px' }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'title'}
                  direction={sortOrder}
                  onClick={() => handleSort('title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'author'}
                  direction={sortOrder}
                  onClick={() => handleSort('author')}
                >
                  Author
                </TableSortLabel>
              </TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedArticles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.tags.join(', ')}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        navigate(`/view/${formatTitleForUrl(article.title)}`)
                      }
                    >
                      View
                    </Button>
                    <IconButton
                      component={Link}
                      to={`/edit/${formatTitleForUrl(article.title)}`}
                      edge="end"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(article.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedArticles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ArticleList;
