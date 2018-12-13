'use strict'

var express = require('express');
var ArtistController = require('../controllers/artista');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./archivos/artistas'})

api.get('/artista/:id', md_auth.ensureAuth, ArtistController.getArtist)
api.post('/artista', md_auth.ensureAuth, ArtistController.SaveArtist)
api.get('/artistas/:page', md_auth.ensureAuth, ArtistController.getArtists)
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist)
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist)
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage)
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile)

module.exports = api;
