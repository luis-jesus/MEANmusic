'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CancionSchema = Schema({
  numero: String,
  nombre: String,
  archivo: String,
  album: { type: Schema.ObjectId, ref:"Album" },
  fecha_lanzamiento: Number,

});

// Exportar modelo
module.exports = mongoose.model('Cancion',CancionSchema);
