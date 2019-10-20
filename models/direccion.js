'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    client_id: {type: Schema.Types.ObjectId, ref: 'Cliente'},
    direction_id: {type: String, required: true},   // ID en Ms Usuarios
    latitude: {type: String, required: true},
    longitude: {type: String, required: true}
});

module.exports = mongoose.model('Direccion', DireccionSchema);