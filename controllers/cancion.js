'use strict'

//importar modelos
var Artista = require('../models/artista');
var Album = require('../models/album');
var Cancion = require('../models/cancion');

//Sistema de archivos y Rutas
var fs = require('fs');
var path = require('path');

/* Metodos */
function getCancion(req,res) {
  var cancionId = req.params.id;

  Cancion.findById(cancionId).populate({
    path:'album',
    populate:{
      path:'artista',
      model:'Artist'
    }
  }).exec((err,cancion)=>{
    if (err) {
      res.status(500).send({mensaje:'Error al buscar canción X'});
    } else {
      if (!cancion) {
        res.status(404).send({mensaje:'Canción no encontrada ?'});
      } else {
        res.status(200).send({cancion, mensaje:'Canción encontrada'});
      }
    }
  });
}

function getCanciones(req,res) {
  var albumId = req.params.album;
  if (!albumId) {
    var find = Cancion.find().sort('id');
  } else {
    var find = Cancion.find({album:albumId}).sort('numero');
  }
  find.populate({
    path:'album',
    populate:{
      path:'artista',
      model:'Artist'
    }
  }).exec((err,canciones)=>{
    if (err) {
      res.status(500).send({mensaje:'Error al buscar canciones'});
    } else {
      if (!canciones) {
        res.status(404).send({mesnaje:'No se encontraron canciones'});
      } else {
        res.status(200).send({canciones, mensaje:'Canciones encontradas'});
      }
    }
  });
}

function saveCancion(req,res) {
  var song = new Cancion();
  var params = req.body;

  song.nombre = params.nombre;
  song.album = params.album;
  song.numero = params.numero;
  song.archivo = 'null';

  song.save((err, songStored)=>{
    if (err) {
      res.status(500).send({mensaje:'Error al salvar canción'});
    } else {
      if (!songStored) {
        res.status(404).send({mensaje:'Canción no encontrada'});
      } else {
        res.status(200).send({songStored, mensaje:'Canción guardada'});
      }
    }
  });
}

//Exportar Metodos
module.exports = {
  getCancion,
  saveCancion,
  getCanciones,
}
