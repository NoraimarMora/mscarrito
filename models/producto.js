'use strict'

var MicroserviceId = require('../customSchemaType/MicroserviceId');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    _id: {type: MicroserviceId, required: true}, // ID en Ms Catalogo
    name: {type: String, required: true},
    image_url: {type: String, allowed: null},
    price: {type: Number, required: true},
    features: [{type: Schema.Types.MicroserviceId, ref: 'Caracteristica'}]
});

module.exports = mongoose.model('Producto', ProductoSchema);