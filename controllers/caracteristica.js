'use strict'

var Caracteristica = require('../models/caracteristica');

var controller = {

    saveCaracteristica: function(request, response) {
        var parameters = request.body
        var caracteristica = new Caracteristica();

        caracteristica._id = parameters.feature_value_id;
        caracteristica.name = parameters.name;
        caracteristica.price_impact = parameters.price_impact;

        caracteristica.save((error, caracteristicaStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!caracteristicaStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var feature = {
                id: caracteristicaStored._id,
                name: caracteristicaStored.name,
                price_impact: caracteristicaStored.price_impact
            }
            
            return response.status(200).send({
                status: 200,
                feature: feature
            });
        });
    },

    getCaracteristica: function(request, response) {
        var caracteristicaId = request.params.id;

        if (caracteristicaId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Caracteristica.findById(caracteristicaId).exec(function (error, caracteristica) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!caracteristica) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var feature = {
                id: caracteristica._id,
                name: caracteristica.name,
                price_impact: caracteristica.price_impact
            }

            return response.status(200).send({
                status: 200,
                feature: feature
            });
        });
    },

    getCaracteristicas: function (request, response) {
        Caracteristica.find({}).exec((error, caracteristicas) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!caracteristicas) {
                return response.status(404).send({
                    status: false, 
                });
            }

            var features = []

            caracteristicas.map((caracteristica) => {
                features.push({
                    id: caracteristica._id,
                    name: caracteristica.name,
                    price_impact: caracteristica.price_impact
                })
            })

            return response.status(200).send({
                status:true, 
                features: features
            });
        });
    },

    updateCaracteristica: function (request, response) {
        var caracteristicaId = request.params.id;
        var update = {};
        var parameters = request.body

        update.name = parameters.name;
        update.price_impact = parameters.priceImpact;

        Caracteristica.findByIdAndUpdate(caracteristicaId, update, {new: true}, (error, caracteristicaUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }

            if (!caracteristicaUpdated) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var feature = {
                id: caracteristicaUpdated._id,
                name: caracteristicaUpdated.name,
                price_impact: caracteristicaUpdated.price_impact
            }

            return response.status(200).send({
                status: 200, 
                feature: feature
            });
        });
    },

    deleteCaracteristica: function (request, response) {
        var caracteristicaId = request.params.id;

        Caracteristica.findByIdAndRemove(caracteristicaId, (error, caracteristicaRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!caracteristicaRemoved) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var feature = {
                id: caracteristicaRemoved._id,
                name: caracteristicaRemoved.name,
                price_impact: caracteristicaRemoved.price_impact
            }

            return response.status(200).send({
                status: 200, 
                feature: feature
            });
        });
    } 
};

module.exports = controller;