const { Artist } = require('../models');

exports.createArtist = (req, res) => {
  Artist.create(req.body).then(artist => res.status(201).json(artist));
};

exports.getArtists = (_, res) => {
  Artist.findAll().then(artists => {
    res.status(200).json(artists);
  });
};

exports.getArtistById = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};

exports.updateArtist = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.deleteArtist = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Artist.destroy({ where: { id } }).then(() => {
        res.status(204).send();
      });
    }
  });
};
