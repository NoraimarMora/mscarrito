'use strict'

var Cliente = require('../models/cliente');

var controller = {

    saveCliente: function(request, response) {
        var parameters = request.body
        var cliente = new Cliente();

        cliente.client_id = parameters.client_id;
        cliente.first_name = parameters.first_name;
        cliente.last_name = parameters.last_name;
        cliente.addresses = parameters.addresses;

        cliente.save((error, clienteStored) => {
            if (error) {
                return response.status(500).send({error});
            } 
            if (!clienteStored) {
                return response.status(404).send({message: 'No se ha podido guardar el documento'});
            }

            
            return response.status(200).send({cliente: clienteStored});
        });
    },

    getCliente: function(request, response) {
        var clienteId = request.params.id;

        if (clienteId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        Cliente.findById(clienteId).exec(function (error, cliente) {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!cliente) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                cliente: cliente
            });
        });
    },

    getClientes: function (request, response) {
        Cliente.find({}).exec((error, clientes) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!clientes) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status:true, 
                clientes: clientes
            });
        });
    },

    updateCliente: function (request, response) {
        var clienteId = request.params.id;
        var update = {};
        var parameters = request.body

        update.first_name = parameters.first_name;
        update.last_name = parameters.last_name;
        update.addresses = parameters.addresses;

        Cliente.findByIdAndUpdate(clienteId, update, {new: true}, (error, clienteUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }

            if (!clienteUpdated) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                cliente: clienteUpdated
            });
        });
    },

    deleteCliente: function (request, response) {
        var clienteId = request.params.id;

        Cliente.findByIdAndRemove(clienteId, (error, clienteRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!clienteRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                cliente: clienteRemoved
            });
        });
    } 
};

module.exports = controller;