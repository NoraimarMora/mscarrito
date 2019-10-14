'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaracteristicaSchema = Schema({
    name: {type: String, required: true},
    price_impact: {type: Number, required: true}
});

module.exports = mongoose.model('Caracteristica', CaracteristicaSchema);