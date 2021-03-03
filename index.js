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

function updateBook(req, res) {
  if (typeof req.body === 'undefined') {
    res.status(400).json({ msg: 'Please enter the info you want to update!' });
    return;
  } else {
    const bookToUpdate = data.find((book) => book.id === req.params.id);
    if (bookToUpdate) {
      bookToUpdate.title = req.body.title ? req.body.title : bookToUpdate.title;
      bookToUpdate.author = req.body.author
        ? req.body.author
        : bookToUpdate.author;

      res.json({ msg: 'The data is updated!', Books: data });
    } else {
      res.status(404).json({ msg: 'The id is invalid!' });
      return;
    }
  }
}

function deleteBook(req, res) {
  const bookToDelete = data.find((book) => book.id === req.params.id);
  if (!bookToDelete) {
    res.status(404).json({ msg: 'The id is invalid!' });
    return;
  } else {
    data.splice(data.indexOf(bookToDelete), 1);
    // data = data.filter((book) => book.id !== req.params.id) <<a better choice if multiple books need to be deleted>>

    res.json({
      msg: 'The book is deleted!',
      Books: data,
    });
  }
}

app.listen('4000', () => {
  console.log('Server started at port 4000');
});
