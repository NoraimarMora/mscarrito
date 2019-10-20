'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarritoSchema = Schema({
    client: {type: Schema.Types.ObjectId, ref: 'Cliente', required: true},
    address: {type: Schema.Types.ObjectId, ref: 'Direccion'},
    phone: {type: String, default: ''},
    tip: {type: Number, default: 0},    // Propina
    products: [{type: Schema.Types.ObjectId, ref: 'ElementoCarrito'}],     
    total: {type: Number, required: true},
    date_created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Carrito', CarritoSchema);