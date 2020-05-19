const { Album, Song } = require('../models');

exports.createSong = (req, res) => {
  const { id } = req.params;

  Album.findByPk(id).then((album) => {
    if (!album) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      const songData = {
        name: req.body.name,
        albumId: album.id,
        artistId: req.body.artist,
      };
      Song.create(songData).then((song) => {
        res.status(201).json(song);
      });
    }
  });
};
