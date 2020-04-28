const { Album } = require('../sequelize');

exports.createAlbum = (req, res) => {
  Album.create(req.body).then(album =>
    album.setArtist(req.params.id).then(linkedAlbum => {
      res.status(201).json(linkedAlbum);
    }),
  );
};
