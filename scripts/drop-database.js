const mysql = require('mysql2');

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
});

connection.query(`DROP DATABASE ${DB_NAME}`, () => connection.end());
