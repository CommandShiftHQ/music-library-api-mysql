const Sequelize = require('sequelize');
const ArtistModel = require('./models/artist');

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: 3306,
  dialect: 'mysql',
});

const Artist = ArtistModel(sequelize, Sequelize);

sequelize.sync();

module.exports = {
  Artist,
};
