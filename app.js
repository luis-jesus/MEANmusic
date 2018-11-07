'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar Rutas
var user_routes = require('./routes/usuario');
var artist_routes = require('./routes/artista');
var album_routes = require('./routes/album');
var cancion_routes = require('./routes/cancion');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar Cabeceras HTTP

// Rutas Base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', cancion_routes);

// Exportar app

module.exports = app;
