const { Album, Artist } = require('../models');

exports.createAlbum = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.create(req.body).then(album => {
        album.setArtist(id).then(linkedAlbum => {
          res.status(201).json(linkedAlbum);
        });
      });
    }
  });
};
