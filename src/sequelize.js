const Sequelize = require('sequelize');
const ArtistModel = require('./models/artist');

const sequelize = new Sequelize('music_library', 'root', 'my-secret-pw', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
});

const Artist = ArtistModel(sequelize, Sequelize);

sequelize.sync();

module.exports = {
  Artist,
};
