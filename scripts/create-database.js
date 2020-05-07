/* eslint-disable no-console */
const mysql = require('mysql2');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err) => {
  if (err) {
    console.log(`Your environment variables might be wrong. Please double check .env file`);
    console.log('Environment Variables are:', { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT });
    console.log(err);
  }
  connection.close();
});
