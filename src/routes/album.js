const { Sequelize } = require('sequelize/types');
const express = require('express');
const albumController = require('../controllers/album');

const router = express.Router();

router.route('/:id/albums').post(albumController.createAlbum);

module.exports = router;
