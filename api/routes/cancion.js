'use strict'

var express = require('express');
var CancionController = require('../controllers/cancion');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./archivos/canciones'})


api.get('/cancion/:id', md_auth.ensureAuth, CancionController.getCancion)
api.get('/canciones/:album?', md_auth.ensureAuth, CancionController.getCanciones)
api.post('/cancion', md_auth.ensureAuth, CancionController.saveCancion)
api.put('/cancion/:id', md_auth.ensureAuth, CancionController.updateCancion)
api.delete('/cancion/:id', md_auth.ensureAuth, CancionController.deleteCancion)
api.post('/uopload-cancion-file/:id', [md_auth.ensureAuth, md_upload], CancionController.uploadCancion)
api.get('/get-cancion-file/:cancionFile', CancionController.getCancionFile)

module.exports = api;
