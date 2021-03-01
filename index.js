const express = require('express');
const app = express();

// READ    - GET     - /books
// CREATE  - POST    - /books
// UPDATE  - PUT     - /books/:id
// DELETE  - DELETE  - /books/:id

app.get('/books', (req, res) => {
  readBooks(req, res);
});
app.post('/books', (req, res) => {
  createBook(req, res);
});
app.put('/books/:id', (req, res) => {
  updateBook(req, res);
});
app.delete('/books/:id', (req, res) => {
  deleteBook(req, res);
});

app.listen('4000', () => {
  console.log('Server started at port 4000');
});
