'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    product_id: {type: Number, required: true}, // ID en Ms Catalogo
    name: {type: String, required: true},
    image_url: {type: String, allowed: null},
    price: {type: Number, required: true},
    features: [{type: Schema.Types.ObjectId, ref: 'Caracteristica'}]
});

module.exports = mongoose.model('Producto', ProductoSchema);