const { Artist } = require('../models');

exports.create = (req, res) => {
  Artist.create(req.body)
    .then((artistDocument) => res.status(201).json(artistDocument))
    .catch((error) => res.status(500).json({ error: error.errors.map((e) => e.message) }));
};

exports.readAll = (req, res) => {
  Artist.findAll(req.query)
    .then((artistDocuments) => res.status(200).json(artistDocuments))
    .catch((error) => res.status(500).json({ error: error.errors.map((e) => e.message) }));
};

exports.readById = (req, res) => {
  Artist.findByPk(req.params.artistId)
    .then(artistDocument => {
      if (artistDocument) {
        res.status(200).json(artistDocument);
      } else {
        res.status(404).send({ error: 'the artist could not be found' });
      }
    })
    .catch((error) => res.status(500).json({ error: error.errors.map((e) => e.message) }));
}

exports.update = (req, res) => {
  Artist.update(req.body, { where: { id: req.params.artistId } })
  .then(([rowsUpdated]) => {
    if (rowsUpdated) {
      res.sendStatus(204)
    } else {
      res.status(404).send({ error: 'the artist could not be found' });
    }
  })
  .catch((error) => res.status(500).json({ error: error.errors.map((e) => e.message) }));
}

exports.delete = (req, res) => {
  Artist.destroy({ where: { id: req.params.artistId } })
  .then((artistsDeleted) => {
    if (artistsDeleted) {
      res.sendStatus(204)
    } else {
      res.status(404).send({ error: 'the artist could not be found' });
    }
  })
  .catch((error) => res.status(500).json({ error: error.errors.map((e) => e.message) }));
}
