const express = require('express');

const artistRouter = require('./routes/artist');

const app = express();

app.use(express.json());

module.exports = app;
