const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const data = require('./books.json');

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

function readBooks(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
}

app.listen('4000', () => {
  console.log('Server started at port 4000');
});
