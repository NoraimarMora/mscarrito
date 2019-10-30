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
            carrito.total = parameters.tip;

            parameters.products.map((product) => {
                var element = new ElementoCarrito();
                element.cart_id = carrito._id,
                element.product = product.id,
                element.quantity = product.quantity,
                element.unit_price = product.unit_price,
                element.features = []

                element.save((error, elementStored) => {
                    if (error) {
                        return response.status(500).send({
                            status: 500,
                            error
                        });
                    } 
                    if (!elementStored) {
                        return response.status(404).send({
                            status: 404,
                            message: 'Not found'
                        });
                    } 
                });

                carrito.total = carrito.total + (element.unit_price * element.quantity);
                carrito.products.push(element._id);
            });

            carrito.save((error, carritoStored) => {
                if (error) {
                    return response.status(500).send({
                        status: 500,
                        error
                    });
                } 
                if (!carritoStored) {
                    return response.status(404).send({
                        status: 404,
                        message: 'No se ha podido guardar el documento'
                    });
                }

                var cart = {
                    id: carritoStored._id,
                    phone: carritoStored.phone,
                    tip: carritoStored.tip,
                    date_created: carritoStored.date_created,
                    products: carritoStored.products,
                    client: carritoStored.client,
                    address: carritoStored.address,
                    total: carritoStored.total
                }

                return response.status(200).send({
                    status: 200, 
                    cart: cart
                });
            });
        } catch (error) {
            return response.status(500).send({
                status: 200,
                error
            });
        }
    },

    getCarrito: function(request, response) {
        var carritoId = request.params.id;

        if (carritoId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Carrito.findById(carritoId)
            .populate('client').populate('address')
            .populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            }).exec(function (error, carrito) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!carrito) {
                return response.status(404).send({
                    status: 404, 
                });
            }

            var products = []

            carrito.products.map((producto) => {
                products.push({
                    id: producto.product._id,
                    cart_id: producto.cart_id,
                    name: producto.product.name,
                    image_url: producto.product.image_url,
                    quantity: producto.quantity,
                    unit_price: producto.unit_price,
                    features: producto.features
                })
            })

            var cart = {
                id: carrito._id,
                phone: carrito.phone,
                tip: carrito.tip,
                date_created: carrito.date_created,
                products: products,
                client: {
                    addresses: carrito.client.addresses,
                    id: carrito.client._id,
                    client_id: carrito.client.client_id,
                    first_name: carrito.client.first_name,
                    last_name: carrito.client.last_name
                },
                address: {
                    id: carrito.address._id,
                    client_id: carrito.address.client_id,
                    address_id: carrito.address.address_id,
                    latitude: carrito.address.latitude,
                    longitude: carrito.address.longitude
                },
                total: carrito.total
            }

            return response.status(200).send({
                status: 200,
                cart: cart
            });
        });
    },

    getCarritoByCliente: function(request, response) {
        var clienteId = request.params.id;

        if (clienteId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Carrito.findOne({client: clienteId})
            .populate('client').populate('address')
            .populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            }).exec(function (error, carrito) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!carrito) {
                return response.status(404).send({
                    status: 404, 
                });
            }

            var products = []

            carrito.products.map((producto) => {
                products.push({
                    id: producto.product._id,
                    cart_id: producto.cart_id,
                    name: producto.product.name,
                    image_url: producto.product.image_url,
                    quantity: producto.quantity,
                    unit_price: producto.unit_price,
                    features: producto.features
                })
            })

            var cart = {
                id: carrito._id,
                phone: carrito.phone,
                tip: carrito.tip,
                date_created: carrito.date_created,
                products: products,
                client: {
                    addresses: carrito.client.addresses,
                    id: carrito.client._id,
                    client_id: carrito.client.client_id,
                    first_name: carrito.client.first_name,
                    last_name: carrito.client.last_name
                },
                address: {
                    id: carrito.address._id,
                    client_id: carrito.address.client_id,
                    address_id: carrito.address.address_id,
                    latitude: carrito.address.latitude,
                    longitude: carrito.address.longitude
                },
                total: carrito.total
            }

            return response.status(200).send({
                status: 200,
                cart: cart
            });
        });
    },

    getCarritos: function (request, response) {
        Carrito.find({}).populate('client').populate('address')
        .populate({
            path: 'products',
            populate: {
                path: 'product'
            }
        }).exec((error, carritos) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!carritos) {
                return response.status(404).send({
                    status: 404, 
                });
            }

            var carts = []

            carritos.map((carrito) => {
                var products = []

                carrito.products.map((producto) => {
                    products.push({
                        id: producto.product._id,
                        cart_id: producto.cart_id,
                        name: producto.product.name,
                        image_url: producto.product.image_url,
                        quantity: producto.quantity,
                        unit_price: producto.unit_price,
                        features: producto.features
                    })
                })

                carts.push({
                    id: carrito._id,
                    phone: carrito.phone,
                    tip: carrito.tip,
                    date_created: carrito.date_created,
                    products: products,
                    client: {
                        addresses: carrito.client.addresses,
                        id: carrito.client._id,
                        client_id: carrito.client.client_id,
                        first_name: carrito.client.first_name,
                        last_name: carrito.client.last_name
                    },
                    address: {
                        id: carrito.address._id,
                        client_id: carrito.address.client_id,
                        address_id: carrito.address.address_id,
                        latitude: carrito.address.latitude,
                        longitude: carrito.address.longitude
                    },
                    total: carrito.total
                })
            })

            return response.status(200).send({
                status: 200, 
                carts: carts
            });
        });
    },

    addElementoCarrito: function (request, response) {
        var carritoId = request.params.id;
        var parameters = request.body
        var total = 0;

        var element = new ElementoCarrito();
        element.cart_id = carritoId,
        element.product = parameters.id,
        element.quantity = parameters.quantity,
        element.unit_price = parameters.unit_price,
        element.features = []

        element.save((error, elementStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!elementStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'Not found'
                });
            } 
        });

        total = total + (element.unit_price * element.quantity);

        if (carritoId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Carrito.findById(carritoId).exec(function (error, carrito) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!carrito) {
                return response.status(404).send({
                    status: 404, 
                });
            }

            carrito.total = carrito.total + total;
            carrito.products.push(element._id);

            Carrito.findByIdAndUpdate(carritoId, carrito, {new: true}, (error, carritoUpdated) => {

                if (error) {
                    return response.status(500).send({
                        status: 500, 
                        error
                    });
                }
    
                if (!carritoUpdated) {
                    return response.status(404).send({
                        status: 404, 
                        message: 'Not found'
                    });
                }
    
                var cart = {
                    id: carritoUpdated._id,
                    phone: carritoUpdated.phone,
                    tip: carritoUpdated.tip,
                    date_created: carritoUpdated.date_created,
                    products: carritoUpdated.products,
                    client: carritoUpdated.client,
                    address: carritoUpdated.address,
                    total: carritoUpdated.total
                }
    
                return response.status(200).send({
                    status: 200, 
                    cart: cart
                });
            });
        });
    },

    deleteElementoCarrito: function (request, response) {
        var carritoId = request.params.id;
        var productId = request.body.product_id;

        ElementoCarrito.find({cart_id: carritoId}).exec((error, elementos) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }

            if (!elementos) {
                console.log('Carrito sin elementos');

                return response.status(200).send({
                    status: 200,
                    message: 'Carrito sin elementos'
                })
            } else {
                var result = elementos.find(elemento => elemento.product == productId);

                Carrito.findById(carritoId).exec(function (error, carrito) {
                    if (error) {
                        return response.status(500).send({
                            status: 500, 
                            error
                        });
                    }
                    if (!carrito) {
                        return response.status(404).send({
                            status: 404, 
                        });
                    }
        
                    carrito.total = carrito.total - (result.unit_price * result.quantity);
                    var index = carrito.products.findIndex(producto => producto._id == result._id);

                    carrito.products.splice(index, 1);
        
                    Carrito.findByIdAndUpdate(carritoId, carrito, {new: true}, (error, carritoUpdated) => {
        
                        if (error) {
                            return response.status(500).send({
                                status: 500, 
                                error
                            });
                        }
            
                        if (!carritoUpdated) {
                            return response.status(404).send({
                                status: 404, 
                                message: 'Not found'
                            });
                        }
            
                        var cart = {
                            id: carritoUpdated._id,
                            phone: carritoUpdated.phone,
                            tip: carritoUpdated.tip,
                            date_created: carritoUpdated.date_created,
                            products: carritoUpdated.products,
                            client: carritoUpdated.client,
                            address: carritoUpdated.address,
                            total: carritoUpdated.total
                        }
            
                        return response.status(200).send({
                            status: 200, 
                            cart: cart
                        });
                    });
                });
            }
        });
    },

    updateCarrito: function (request, response) {
        var carritoId = request.params.id;
        var update = {};
        var parameters = request.body

        update.address = parameters.address;
        update.phone = parameters.phone;
        update.tip = parameters.tip;
        update.total = parameters.tip;

        ElementoCarrito.find({cart_id: carritoId}).exec((error, elementos) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }

            if (!elementos) {
                console.log('Carrito sin elementos');
            } else {
                elementos.map((product) => {
                    update.total = update.total + (product.unit_price * product.quantity);
                });
            }
        });

        Carrito.findByIdAndUpdate(carritoId, update, {new: true}, (error, carritoUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }

            if (!carritoUpdated) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var cart = {
                id: carritoUpdated._id,
                phone: carritoUpdated.phone,
                tip: carritoUpdated.tip,
                date_created: carritoUpdated.date_created,
                products: carritoUpdated.products,
                client: carritoUpdated.client,
                address: carritoUpdated.address,
                total: carritoUpdated.total
            }

            return response.status(200).send({
                status: 200, 
                cart: cart
            });
        });
    },

    deleteCarrito: function (request, response) {
        var carritoId = request.params.id;

        if (carritoId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Carrito.findById(carritoId)
            .populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            }).exec(function (error, carrito) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!carrito) {
                return response.status(404).send({
                    status: 404, 
                });
            }

            var products = []

            carrito.products.map((producto) => {
                products.push({
                    id: producto.product._id,
                    quantity: producto.quantity,
                    unit_price: producto.unit_price,
                    features: producto.features
                })
            })

            var cartProcessed = {
                id: carrito._id,
                phone: carrito.phone,
                products: products,
                client: carrito.client,
                address: carrito.address,
                total: carrito.total,
                payment_method: 'tdc',
                status: '5db65f595621e400213ce6ea'
            }

            notifyCartProcessed(cartProcessed);            
        });

        ElementoCarrito.deleteMany({cart_id: carritoId}, (error, elements) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
        });

        Carrito.findByIdAndRemove(carritoId, (error, carritoRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!carritoRemoved) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var cart = {
                id: carritoRemoved._id,
                phone: carritoRemoved.phone,
                tip: carritoRemoved.tip,
                date_created: carritoRemoved.date_created,
                products: carritoRemoved.products,
                client: carritoRemoved.client,
                address: carritoRemoved.address,
                total: carritoRemoved.total
            }

            return response.status(200).send({
                status: 200, 
                cart: cart
            });
        });
    } 
};

module.exports = controller;