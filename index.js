const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

function createBook(req, res) {
  const newBook = {
    id: uuidv4(),
    title: req.body.title,
    author: req.body.author,
  };

  if (
    typeof req.body.title === 'undefined' ||
    typeof req.body.author === 'undefined'
  ) {
    res.status(400);
    res.send('invalid request');
    return;
  } else if (data.some((element) => element.id === newBook.id)) {
    console.log('This book already exists!');
  } else {
    data.push(newBook);
    res.json({ msg: 'New book added to the list', Books: data });
  }
}

app.listen('4000', () => {
  console.log('Server started at port 4000');
});
