'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaracteristicaSchema = Schema({
    feature_value_id: {type: String, required: true}, // ID en Ms Catalogo
    name: {type: String, required: true},
    price_impact: {type: Number, required: true}
});

module.exports = mongoose.model('Caracteristica', CaracteristicaSchema);