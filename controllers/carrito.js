'use strict'

var Carrito = require('../models/carrito');
var ElementoCarrito = require('../models/elementoCarrito');
var mongoose = require('mongoose');
const { notifyCartProcessed } = require('../broker');

var controller = {

    saveCarrito: function(request, response) {
        var parameters = request.body
        var carrito = new Carrito();

        try {
            carrito._id = new mongoose.Types.ObjectId()
            carrito.client = parameters.client;
            carrito.address = parameters.address;
            carrito.phone = parameters.phone;
            carrito.tip = parameters.tip;
            carrito.products = [];
            carrito.total = 0;

            parameters.products.map((product) => {
                var element = new ElementoCarrito();
                element.cart_id = carrito._id,
                element.product = product.id,
                element.quantity = product.quantity,
                element.unit_price = product.unit_price,
                element.features = []

                element.save((error, elementStored) => {
                    if (error) {
                        return response.status(500).send({error});
                    } 
                    if (!elementStored) {
                        return response.status(404).send({message: 'Not found'});
                    } 
                });

                carrito.total = carrito.total + (element.unit_price * element.quantity);
                carrito.products.push(element._id);
            });

            carrito.save((error, carritoStored) => {
                if (error) {
                    return response.status(500).send({error});
                } 
                if (!carritoStored) {
                    return response.status(404).send({message: 'No se ha podido guardar el documento'});
                }

                notifyCartProcessed('task1', carritoStored);
                return response.status(200).send({carrito: carritoStored});
            });
        } catch (error) {
            return response.status(500).send({error});
        }
    },

    getCarrito: function(request, response) {
        var carritoId = request.params.id;

        if (carritoId == null) {
            return response.status(404).send({
                status: false, 
                message: 'Not found'
            });
        }

        Carrito.findById(carritoId)
            .populate('client').populate('address')
            .populate('products').exec(function (error, carrito) {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!carrito) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                carrito: carrito
            });
        });
    },

    getCarritos: function (request, response) {
        Carrito.find({}).populate('client').populate('address')
        .populate('products').exec((error, carritos) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!carritos) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: 200, 
                carts: carritos
            });
        });
    },

    updateCarrito: function (request, response) {
        var carritoId = request.params.id;
        var update = {};
        var parameters = request.body
        var total = 0;

        update.address = parameters.address;
        update.phone = parameters.phone;
        update.tip = parameters.tip;
        update.products = [];

        ElementoCarrito.find({cartId: carritoId}).exec((error, elementos) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!elementos) {
                parameters.products.map((product) => {
                    var element = ElementoCarrito.create({
                        product: product.id,
                        quantity: product.quantity,
                        unit_price: product.unit_price,
                        features: []
                    });
    
                    total = total + (product.unit_price * product.quantity);
                    update.products.push(element._id);
                });
    
                update.total = total;
            }

            parameters.products.map((product) => {
                var result = elementos.find(elemento => elemento.product == product.id);

                if (result != undefined) {
                    result.quantity = product.quantity;
                    result.unit_price = product.unit_price;

                    ElementoCarrito.findByIdAndUpdate(result._id, result, {new: true}, (error, resultUpdated) => {
                        if (error) {
                            return response.status(500).send({
                                status: false, 
                                error
                            });
                        }
                    });

                    total = total + (product.unit_price * product.quantity);
                    update.products.push(result._id);
                } else {
                    var element = ElementoCarrito.create({
                        product: product.id,
                        quantity: product.quantity,
                        unit_price: product.unit_price,
                        features: []
                    });
    
                    total = total + (product.unit_price * product.quantity);
                    update.products.push(element._id);
                }
            });

            update.total = total;
        });

        Carrito.findByIdAndUpdate(carritoId, update, {new: true}, (error, carritoUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }

            if (!carritoUpdated) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                carrito: carritoUpdated
            });
        });
    },

    deleteCarrito: function (request, response) {
        var carritoId = request.params.id;

        ElementoCarrito.deleteMany({cart_id: carritoId}, (error, elements) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
        });

        Carrito.findByIdAndRemove(carritoId, (error, carritoRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!carritoRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                carrito: carritoRemoved
            });
        });
    } 
};

module.exports = controller;