const Sequelize = require('sequelize');
const ArtistModel = require('./artist');
const AlbumModel = require('./album');
const SongModel = require('./song');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, NODE_ENV } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: NODE_ENV === 'production' ? 'pg' : 'mysql',
    logging: false,
  });

  const Artist = ArtistModel(connection, Sequelize);
  const Album = AlbumModel(connection, Sequelize);
  const Song = SongModel(connection, Sequelize);

  
  Album.belongsTo(Artist, { as: 'artist', foreignKey: { allowNull: false }, onDelete: "CASCADE"});
  Artist.hasMany(Album, { as: 'albums', foreignKey: 'id' });

  Song.belongsTo(Album, { as: 'album', foreignKey: { allowNull: false }, onDelete: "CASCADE" });
  Album.hasMany(Song, { as: 'albums', foreignKey: 'id' });

  Song.belongsTo(Artist, { as: 'artist', foreignKey: { allowNull: false }, onDelete: "CASCADE" });
  Artist.hasMany(Song, { as: 'songs', foreignKey: 'id' });

  connection.sync({ alter: true });
  return {
    Artist,
    Album,
    Song
  };
};

module.exports = setupDatabase();
