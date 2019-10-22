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
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!elementoCarritoStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var cart_item = {
                id: elementoCarritoStored._id,
                cart_id: elementoCarritoStored.cart_id,
                product: elementoCarritoStored.product,
                quantity: elementoCarritoStored.quantity,
                unit_price: elementoCarritoStored.unit_price,
                features: elementoCarritoStored.features
            }
            
            return response.status(200).send({
                status: 200,
                cart_item: cart_item
            });
        });
    },

    getElementoCarrito: function(request, response) {
        var elementoCarritoId = request.params.id;

        if (elementoCarritoId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        ElementoCarrito.findById(elementoCarritoId).exec(function (error, elementoCarrito) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!elementoCarrito) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var cart_item = {
                id: elementoCarrito._id,
                cart_id: elementoCarrito.cart_id,
                product: elementoCarrito.product,
                quantity: elementoCarrito.quantity,
                unit_price: elementoCarrito.unit_price,
                features: elementoCarrito.features
            }

            return response.status(200).send({
                status: 200,
                cart_item: cart_item
            });
        });
    },

    getElementosCarrito: function (request, response) {
        ElementoCarrito.find({}).exec((error, elementosCarrito) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!elementosCarrito) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var cart_items = []

            elementosCarrito.map((elementoCarrito) => {
                cart_items.push({
                    id: elementoCarrito._id,
                    cart_id: elementoCarrito.cart_id,
                    product: elementoCarrito.product,
                    quantity: elementoCarrito.quantity,
                    unit_price: elementoCarrito.unit_price,
                    features: elementoCarrito.features
                })
            })

            return response.status(200).send({
                status: 200, 
                cart_items: cart_items
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
                    status: 500, 
                    error
                });
            }

            if (!elementoCarritoUpdated) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var cart_item = {
                id: elementoCarritoUpdated._id,
                cart_id: elementoCarritoUpdated.cart_id,
                product: elementoCarritoUpdated.product,
                quantity: elementoCarritoUpdated.quantity,
                unit_price: elementoCarritoUpdated.unit_price,
                features: elementoCarritoUpdated.features
            }

            return response.status(200).send({
                status: 200, 
                cart_item: cart_item
            });
        });
    },

    deleteElementoCarrito: function (request, response) {
        var elementoCarritoId = request.params.id;

        ElementoCarrito.findByIdAndRemove(elementoCarritoId, (error, elementoCarritoRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!elementoCarritoRemoved) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var cart_item = {
                id: elementoCarritoRemoved._id,
                cart_id: elementoCarritoRemoved.cart_id,
                product: elementoCarritoRemoved.product,
                quantity: elementoCarritoRemoved.quantity,
                unit_price: elementoCarritoRemoved.unit_price,
                features: elementoCarritoRemoved.features
            }

            return response.status(200).send({
                status: 200, 
                cart_item: cart_item
            });
        });
    } 
};

module.exports = controller;