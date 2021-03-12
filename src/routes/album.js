const express = require('express');
const songController = require('../controllers/song');

const router = express.Router();

router.route('/:albumId/songs')
.post(songController.create);

module.exports = router;