'use strict'

var Producto = require('../models/producto');

var controller = {

    saveProducto: function(request, response) {
        var parameters = request.body
        var producto = new Producto();

        producto.product_id = parameters.product_id;
        producto.name = parameters.name;
        producto.image_url = parameters.image_url;
        producto.price = parameters.price;
        producto.features = parameters.features;

        producto.save((error, productoStored) => {
            if (error) {
                return response.status(500).send({error});
            } 
            if (!productoStored) {
                return response.status(404).send({message: 'No se ha podido guardar el documento'});
            }

            
            return response.status(200).send({producto: productoStored});
        });
    },

    getProducto: function(request, response) {
        var productoId = request.params.id;

        if (productoId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        Producto.findById(productoId).exec(function (error, producto) {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!producto) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                producto: producto
            });
        });
    },

    getProductos: function (request, response) {
        Producto.find({}).exec((error, productos) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!productos) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status:true, 
                productos: productos
            });
        });
    },

    updateProducto: function (request, response) {
        var productoId = request.params.id;
        var update = {};
        var parameters = request.body

        update.name = parameters.name;
        update.image_url = parameters.image_url;
        update.price = parameters.price;
        update.features = parameters.features;

        Producto.findByIdAndUpdate(productoId, update, {new: true}, (error, productoUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }

            if (!productoUpdated) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                producto: productoUpdated
            });
        });
    },

    deleteProducto: function (request, response) {
        var productoId = request.params.id;

        Producto.findByIdAndRemove(productoId, (error, productoRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!productoRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                producto: productoRemoved
            });
        });
    } 
};

module.exports = controller;