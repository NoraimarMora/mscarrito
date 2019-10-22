'use strict'

var Producto = require('../models/producto');

var controller = {

    saveProducto: function(request, response) {
        var parameters = request.body
        var producto = new Producto();

        producto._id = parameters.product_id;
        producto.name = parameters.name;
        producto.image_url = parameters.image_url;
        producto.price = parameters.price;
        producto.features = parameters.features;

        producto.save((error, productoStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!productoStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var product = {
                id: productoStored._id,
                name: productoStored.name,
                image_url: productoStored.image_url,
                price: productoStored.price,
                features: productoStored.features
            }

            return response.status(200).send({
                status: 200,
                product: product
            });
        });
    },

    getProducto: function(request, response) {
        var productoId = request.params.id;

        if (productoId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Producto.findById(productoId).exec(function (error, producto) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!producto) {
                return response.status(404).send({
                    status: 404,
                    message: 'Not found' 
                });
            }

            var product = {
                id: producto._id,
                name: producto.name,
                image_url: producto.image_url,
                price: producto.price,
                features: producto.features
            }

            return response.status(200).send({
                status: 200,
                product: product
            });
        });
    },

    getProductos: function (request, response) {
        Producto.find({}).exec((error, productos) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!productos) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var products = []

            productos.map((producto) => {
                products.push({
                    id: producto._id,
                    name: producto.name,
                    image_url: producto.image_url,
                    price: producto.price,
                    features: producto.features
                })
            })

            return response.status(200).send({
                status: 200, 
                products: products
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
                    status: 500, 
                    error
                });
            }

            if (!productoUpdated) {
                return response.status(404).send({
                    status: 404, 
                });
            }

            var product = {
                id: productoUpdated._id,
                name: productoUpdated.name,
                image_url: productoUpdated.image_url,
                price: productoUpdated.price,
                features: productoUpdated.features
            }

            return response.status(200).send({
                status: 200, 
                product: product
            });
        });
    },

    deleteProducto: function (request, response) {
        var productoId = request.params.id;

        Producto.findByIdAndRemove(productoId, (error, productoRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!productoRemoved) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var product = {
                id: productoRemoved._id,
                name: productoRemoved.name,
                image_url: productoRemoved.image_url,
                price: productoRemoved.price,
                features: productoRemoved.features
            }

            return response.status(200).send({
                status: 200, 
                product: product
            });
        });
    } 
};

module.exports = controller;