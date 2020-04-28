const { Artist } = require('../sequelize');

exports.createArtist = (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.getArtists = (_, res) => {
  Artist.findAll().then(artists => {
    res.status(200).json(artists);
  });
};

exports.getArtistById = (req, res) => {
  Artist.findByPk(req.params.id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};
