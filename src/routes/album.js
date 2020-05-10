const express = require('express');
const songController = require('../controllers/song');

const router = express.Router();

router.post('/:id/song', songController.createSong);

module.exports = router;
