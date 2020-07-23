const { Artist } = require('../models');

exports.createArtist = (req, res) => {
  Artist.create(req.body).then((artist) => res.status(201).json(artist));
};
