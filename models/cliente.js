'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    addresses: [{type: Schema.Types.ObjectId, ref: 'Direccion'}]
});

module.exports = mongoose.model('Cliente', ClienteSchema);