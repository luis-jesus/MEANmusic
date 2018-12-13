'use strict'

var Artista = require('../models/artista');
var Album = require('../models/album');
var Cancion = require('../models/cancion');
var fs = require('fs');
var path = require('path');

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

function updateCancion(req,res) {
  var cancionId = req.params.id;
  var update = req.body;

  Cancion.findByIdAndUpdate(cancionId, update,(err, cancionUpdated)=>{
    if (err) {
      res.status(500).send({mensaje:'Error de servidor'});
    } else {
      if (!cancionId) {
        res.status(404).send({mensaje:'Canción no encontrada'});
      } else {
        res.status(200).send({cancionUpdated, mensaje:'Canción encontrada'});
      }
    }
  });
}

function deleteCancion(req, res) {
  var albumId = req.params.id;
  Cancion.findByIdAndRemove(albumId, (err, cancionRemoved) => {
    if (err) {
      res.status(500).send({mensaje:'Error al Eliminar la canción ❌'});
    } else {
      if (!cancionRemoved) {
        res.status(404).send({mensaje:'La canción no existe ⚠️'});
      } else {
        res.status(200).send({cancion: cancionRemoved, mensaje:'Canción Eliminada Correctamente ✅'});
      }
    }
  });
}

function uploadCancion(req,res) {
  var cancionId = req.params.id;
  var file_name = 'No subido';
  if (req.files) {
    var file_path = req.files.archivo.path;
    var file_split = file_path.split('\/');
    var file_name = file_split[2];
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];
    if (file_ext == 'mp3' || file_ext == 'm4a') {
      Cancion.findByIdAndUpdate(cancionId, {archivo: file_name}, (err, cancionUpdated) => {
        if (err) {
          res.status(500).send({mensaje:'Error al Actualizar la canción ❌♻️'});
        } else {
          if (!cancionUpdated) {
            res.status(404).send({mensaje:'No se ah podido Actualizar la canción ❎'});
          }else {
            res.status(200).send({cancion: cancionUpdated, mensaje:'Canción Actualizado Correctamente ✅'});
          }
        }
      });
    } else {
      res.status(200).send({ mensaje:'Por favor selecciona una canción... ⚠️' });
    }
    console.log(ext_split);
  }else {
    res.status(200).send({ mensaje:'La canción no se ah subido ❌' });
  }
}

function getCancionFile(req, res) {
  var cancionFile = req.params.cancionFile;
  var path_file = './archivos/canciones/'+cancionFile;

  fs.exists(path_file, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ mensaje:'La canción no existe ❓' });
    }
  });
}

module.exports = {
  getCancion,
  saveCancion,
  getCanciones,
  updateCancion,
  deleteCancion,
  uploadCancion,
  getCancionFile
}
