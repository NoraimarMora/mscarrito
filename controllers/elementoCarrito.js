'use strict'

var ElementoCarrito = require('../models/elementoCarrito');

var controller = {

    saveElementoCarrito: function(request, response) {
        var parameters = request.body
        var elementoCarrito = new ElementoCarrito();

        elementoCarrito.cart_id = parameters.cart_id;
        elementoCarrito.product = parameters.product;
        elementoCarrito.quantity = parameters.quantity;
        elementoCarrito.unit_price = parameters.unit_price;
        elementoCarrito.features = parameters.features;

        elementoCarrito.save((error, elementoCarritoStored) => {
            if (error) {
                return response.status(500).send({error});
            } 
            if (!elementoCarritoStored) {
                return response.status(404).send({message: 'No se ha podido guardar el documento'});
            }

            
            return response.status(200).send({elementoCarrito: elementoCarritoStored});
        });
    },

    getElementoCarrito: function(request, response) {
        var elementoCarritoId = request.params.id;

        if (elementoCarritoId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        ElementoCarrito.findById(elementoCarritoId).exec(function (error, elementoCarrito) {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!elementoCarrito) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                elementoCarrito: elementoCarrito
            });
        });
    },

    getElementosCarrito: function (request, response) {
        ElementoCarrito.find({}).exec((error, elementosCarrito) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!elementosCarrito) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status:true, 
                elementosCarrito: elementosCarrito
            });
        });
    },

    updateElementoCarrito: function (request, response) {
        var elementoCarritoId = request.params.id;
        var update = {};
        var parameters = request.body

        update.quantity = parameters.quantity;
        update.unit_price = parameters.unit_price;
        update.features = parameters.features;

        ElementoCarrito.findByIdAndUpdate(elementoCarritoId, update, {new: true}, (error, elementoCarritoUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }

            if (!elementoCarritoUpdated) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                elementoCarrito: elementoCarritoUpdated
            });
        });
    },

    deleteElementoCarrito: function (request, response) {
        var elementoCarritoId = request.params.id;

        ElementoCarrito.findByIdAndRemove(elementoCarritoId, (error, elementoCarritoRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!elementoCarritoRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                elementoCarrito: elementoCarritoRemoved
            });
        });
    } 
};

module.exports = controller;