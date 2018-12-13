'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
  titulo: String,
  artista: { type: Schema.ObjectId, ref:"Artist" },
  descripcion: String,
  fecha_lanzamiento: Number,
  imagen: String,
});

module.exports = mongoose.model('Album',AlbumSchema);
