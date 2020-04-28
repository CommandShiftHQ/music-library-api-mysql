const express = require('express');
const { Artist } = require('./sequelize');

const app = express();

app.use(express.json());

app.post('/artists', (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
});

module.exports = app;
