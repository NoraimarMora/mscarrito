'use strict'

var MicroserviceId = require('../customSchemaType/MicroserviceId');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    //_id: ID en Ms Usuarios
    client_id: {type: Schema.Types.ObjectId, ref: 'Cliente'},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true}
});

module.exports = mongoose.model('Direccion', DireccionSchema);