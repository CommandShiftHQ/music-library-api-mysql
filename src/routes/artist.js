const express = require('express');
const artistController = require('../controllers/artist');

const router = express.Router();

router
  .route('/')
  .post(artistController.createArtist)
  .get(artistController.getArtists);

router
  .route('/:id')
  .get(artistController.getArtistById)
  .patch(artistController.updateArtist)
  .delete(artistController.deleteArtist);

module.exports = router;
