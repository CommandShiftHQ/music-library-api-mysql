const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({
    message: 'Hello world!',
  });
});

module.exports = app;
