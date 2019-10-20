'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    client_id: {type: String, required: true},  // ID en Ms Usuarios
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    addresses: [{type: Schema.Types.ObjectId, ref: 'Direccion'}]
});

module.exports = mongoose.model('Cliente', ClienteSchema);