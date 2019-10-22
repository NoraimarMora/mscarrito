'use strict'

var MicroserviceId = require('../customSchemaType/MicroserviceId');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaracteristicaSchema = Schema({
    _id: {type: MicroserviceId, required: true}, // ID en Ms Catalogo
    name: {type: String, required: true},
    price_impact: {type: Number, required: true}
});

module.exports = mongoose.model('Caracteristica', CaracteristicaSchema);