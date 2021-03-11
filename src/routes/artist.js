const express = require('express');
const app = require('../app');
const artistController = require('../controllers/artist');
const albumController = require('../controllers/album');

const router = express.Router();

router.route('/').post(artistController.create).get(artistController.readAll);

router
  .route('/:artistId')
  .get(artistController.readById)
  .patch(artistController.update)
  .delete(artistController.delete);

router
  .route('/:artistId/albums')
  .post(albumController.create);

module.exports = router;
