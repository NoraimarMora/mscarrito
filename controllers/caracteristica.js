'use strict'

var Caracteristica = require('../models/caracteristica');

var controller = {

    saveCaracteristica: function(request, response) {
        var parameters = request.body
        var caracteristica = new Caracteristica();

        caracteristica.feature_value_id = parameters.feature_value_id;
        caracteristica.name = parameters.name;
        caracteristica.price_impact = parameters.price_impact;

        caracteristica.save((error, caracteristicaStored) => {
            if (error) {
                return response.status(500).send({error});
            } 
            if (!caracteristicaStored) {
                return response.status(404).send({message: 'No se ha podido guardar el documento'});
            }

            
            return response.status(200).send({caracteristica: caracteristicaStored});
        });
    },

    getCaracteristica: function(request, response) {
        var caracteristicaId = request.params.id;

        if (caracteristicaId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        Caracteristica.findById(caracteristicaId).exec(function (error, caracteristica) {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!caracteristica) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                caracteristica: caracteristica
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

            return response.status(200).send({
                status:true, 
                caracteristicas: caracteristicas
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
                    status: false, 
                    error
                });
            }

            if (!caracteristicaUpdated) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                caracteristica: caracteristicaUpdated
            });
        });
    },

    deleteCaracteristica: function (request, response) {
        var caracteristicaId = request.params.id;

        Caracteristica.findByIdAndRemove(caracteristicaId, (error, caracteristicaRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!caracteristicaRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                caracteristica: caracteristicaRemoved
            });
        });
    } 
};

module.exports = controller;