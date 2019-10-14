'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    latitude: {type: String, required: true},
    longitude: {type: String, required: true}
});

module.exports = mongoose.model('Direccion', DireccionSchema);