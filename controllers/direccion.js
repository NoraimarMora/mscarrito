'use strict'

var Direccion = require('../models/direccion');

var controller = {

    saveDireccion: function(request, response) {
        var parameters = request.body
        var direccion = new Direccion();

        direccion.client_id = parameters.client_id;
        direccion._id = parameters.address_id;
        direccion.latitude = parameters.latitude;
        direccion.longitude = parameters.longitude;

        direccion.save((error, direccionStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!direccionStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var address = {
                id: direccionStored._id,
                client_id: direccionStored.client_id,
                latitude: direccionStored.latitude,
                longitude: direccionStored.longitude
            }
            
            return response.status(200).send({
                status: 200,
                address: address
            });
        });
    },

    getDireccion: function(request, response) {
        var direccionId = request.params.id;

        if (direccionId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Direccion.findById(direccionId).exec(function (error, direccion) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!direccion) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var address = {
                id: direccion._id,
                client_id: direccion.client_id,
                latitude: direccion.latitude,
                longitude: direccion.longitude
            }

            return response.status(200).send({
                status: 200,
                address: address
            });
        });
    },

    getDirecciones: function (request, response) {
        Direccion.find({}).exec((error, direcciones) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!direcciones) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var addresses = []

            direcciones.map((direccion) => {
                addresses.push({
                    id: direccion._id,
                    client_id: direccion.client_id,
                    latitude: direccion.latitude,
                    longitude: direccion.longitude
                })
            })

            return response.status(200).send({
                status: 200, 
                addresses: addresses
            });
        });
    },

    updateDireccion: function (request, response) {
        var direccionId = request.params.id;
        var update = {};
        var parameters = request.body

        update.latitude = parameters.latitude;
        update.longitude = parameters.longitude;

        Direccion.findByIdAndUpdate(direccionId, update, {new: true}, (error, direccionUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }

            if (!direccionUpdated) {
                return response.status(404).send({
                    status: 404, 
                });
            }

            var address = {
                id: direccionUpdated._id,
                client_id: direccionUpdated.client_id,
                latitude: direccionUpdated.latitude,
                longitude: direccionUpdated.longitude
            }

            return response.status(200).send({
                status: 200, 
                address: address
            });
        });
    },

    deleteDireccion: function (request, response) {
        var direccionId = request.params.id;

        Direccion.findByIdAndRemove(direccionId, (error, direccionRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!direccionRemoved) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var address = {
                id: direccionRemoved._id,
                client_id: direccionRemoved.client_id,
                latitude: direccionRemoved.latitude,
                longitude: direccionRemoved.longitude
            }

            return response.status(200).send({
                status: 200, 
                address: address
            });
        });
    } 
};

module.exports = controller;