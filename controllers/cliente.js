'use strict'

var Cliente = require('../models/cliente');

var controller = {

    saveCliente: function(request, response) {
        var parameters = request.body
        var cliente = new Cliente();

        cliente._id = parameters.client_id;
        cliente.first_name = parameters.first_name;
        cliente.last_name = parameters.last_name;
        cliente.addresses = parameters.addresses;

        cliente.save((error, clienteStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!clienteStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var client = {
                id: clienteStored._id,
                addresses: clienteStored.addresses,
                first_name: clienteStored.first_name,
                last_name: clienteStored.last_name
            }

            return response.status(200).send({
                status: 200,
                client: client
            });
        });
    },

    getCliente: function(request, response) {
        var clienteId = request.params.id;

        if (clienteId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Cliente.findById(clienteId).exec(function (error, cliente) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!cliente) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var client = {
                id: cliente._id,
                addresses: cliente.addresses,
                first_name: cliente.first_name,
                last_name: cliente.last_name
            }

            return response.status(200).send({
                status: 200,
                client: client
            });
        });
    },

    getClientes: function (request, response) {
        Cliente.find({}).exec((error, clientes) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!clientes) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var clients = []

            clientes.map((cliente) => {
                clients.push({
                    id: cliente._id,
                    addresses: cliente.addresses,
                    first_name: cliente.first_name,
                    last_name: cliente.last_name
                })
            })

            return response.status(200).send({
                status: 200, 
                clients: clients
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
                    status: 500, 
                    error
                });
            }

            if (!clienteUpdated) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var client = {
                id: clienteUpdated._id,
                addresses: clienteUpdated.addresses,
                first_name: clienteUpdated.first_name,
                last_name: clienteUpdated.last_name
            }

            return response.status(200).send({
                status: 200, 
                client: client
            });
        });
    },

    deleteCliente: function (request, response) {
        var clienteId = request.params.id;

        Cliente.findByIdAndRemove(clienteId, (error, clienteRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!clienteRemoved) {
                return response.status(404).send({
                    status: 404,
                    message: 'Not found' 
                });
            }

            var client = {
                id: clienteRemoved._id,
                addresses: clienteRemoved.addresses,
                first_name: clienteRemoved.first_name,
                last_name: clienteRemoved.last_name
            }

            return response.status(200).send({
                status: 200, 
                client: client
            });
        });
    } 
};

module.exports = controller;