const Sequelize = require('sequelize');
const { Album } = require('../models');

exports.create = (req, res) => {
  const albumData = req.body;
  albumData.artistId = req.params.artistId;

  Album.create(albumData)
    .then((albumDocument) => res.status(201).json(albumDocument))
    .catch((error) => {
      if (error instanceof Sequelize.ForeignKeyConstraintError) {
        res.status(404).json({ error: 'the artist could not be found' });
      } else {
        res.status(500).json({ error: error.errors.map((e) => e.message) });
      }
    });
};
