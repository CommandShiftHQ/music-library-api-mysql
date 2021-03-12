const Sequelize = require('sequelize');
const { Song } = require('../models');

exports.create = (req, res) => {
  const songData = req.body;
  songData.albumId = parseInt(req.params.albumId);

  console.log(req.body)

  Song.create(songData)
    .then((songDocument) => res.status(201).json(songDocument))
    .catch((error) => {
      if (error instanceof Sequelize.ForeignKeyConstraintError) {
        res.status(404).json({ error: 'the artist could not be found' });
      } else {
        res.status(500).json({ error: error.errors.map((e) => e.message) });
      }
    });
}
