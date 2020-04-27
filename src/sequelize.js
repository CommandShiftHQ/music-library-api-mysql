const Sequelize = require('sequelize');
const ArtistModel = require('./models/artist');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: 3306,
  dialect: 'mysql',
});

const Artist = ArtistModel(sequelize, Sequelize);

sequelize.sync();

module.exports = {
  Artist,
};
