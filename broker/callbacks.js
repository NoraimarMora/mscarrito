var Cliente = require('../models/cliente');
var Direccion = require('../models/direccion');
var Producto = require('../models/cliente');
var Caracteristica = require('../models/caracteristica');

var callback = {

    productCreated: function(product) {
        var parameters = product.product;
        var producto = new Producto();

        producto._id = parameters.id;
        producto.name = parameters.name;
        producto.image_url = parameters.image_url;
        producto.price = parameters.price;
        producto.features = [];

        producto.save((error, productoStored) => {
            if (error) {
                console.log('status: 500 - Ha ocurrido un error');
            } 

            if (!productoStored) {
                console.log('status: 404 - No se ha podido guardar el documento');
            }

            console.log('status: 200 - Producto guardado')
        });
    },

    productUpdated: function(product) {
        var parameters = product.product;
        var update = {};

        update.name = parameters.name;
        update.image_url = parameters.image_url;
        update.price = parameters.price;
        update.features = [];

        Producto.findByIdAndUpdate(parameters.id, update, {new: true}, (error, productoUpdated) => {
            if (error) {
                console.log('status: 500 - Ha ocurrido un error');
            } 

            if (!productoUpdated) {
                console.log('status: 404 - No se ha podido guardar el documento');
            }

            console.log('status: 200 - Producto actualizado')
        });
    },

    productDeleted: function(product) {
        var parameters = product.product;

        Producto.findByIdAndRemove(parameters.id, (error, productoRemoved) => {
            if (error) {
                console.log('status: 500 - Ha ocurrido un error');
            } 

            if (!productoRemoved) {
                console.log('status: 404 - No se ha podido guardar el documento');
            }

            console.log('status: 200 - Producto eliminado')
        });
    },

    productCharacteristicCreated: function(feature) {
        // 
    },

    productCharacteristicUpdated: function(feature) {
        // 
    },

    productCharacteristicDeleted: function(feature) {
        // 
    },

    clientCreated: function(client) {
        var parameters = client.client;
        var cliente = new Cliente();

        cliente._id = parameters._id;
        cliente.first_name = parameters.first_name;
        cliente.last_name = parameters.last_name;
        cliente.addresses = parameters.addresses;

        cliente.save((error, clienteStored) => {
            if (error) {
                console.log('status: 500 - Ha ocurrido un error');
            } 

            if (!clienteStored) {
                console.log('status: 404 - No se ha podido guardar el documento');
            }

            console.log('status: 200 - Cliente guardado')
        });
    },

    clientUpdated: function(client) {
        var parameters = client.client;
        var update = {};

        update.first_name = parameters.first_name;
        update.last_name = parameters.last_name;
        update.addresses = parameters.addresses;

        Cliente.findByIdAndUpdate(parameters._id, update, {new: true}, (error, clienteUpdated) => {
            if (error) {
                console.log('status: 500 - Ha ocurrido un error');
            } 

            if (!clienteUpdated) {
                console.log('status: 404 - No se ha podido guardar el documento');
            }

            console.log('status: 200 - Cliente actualizado')
        });
    },

    clientDeleted: function(client) {
        var parameters = client.client;

        Cliente.findByIdAndRemove(parameters._id, (error, clienteRemoved) => {
            if (error) {
                console.log('status: 500 - Ha ocurrido un error');
            } 

            if (!clienteRemoved) {
                console.log('status: 404 - No se ha podido guardar el documento');
            }

            console.log('status: 200 - Cliente eliminado')
        });
    },

    addressCreated: function(address) {
        var parameters = address.address
        var direccion = new Direccion();

        direccion.client_id = parameters.client;
        direccion._id = parameters._id;
        direccion.latitude = parameters.latitude;
        direccion.longitude = parameters.longitude;

        direccion.save((error, direccionStored) => {
            if (error) {
                console.log('status: 500 - Ha ocurrido un error');
            } 

            if (!direccionStored) {
                console.log('status: 404 - No se ha podido guardar el documento');
            }

            console.log('status: 200 - Direccion guardada')
        });
    },

    addressUpdated: function(address) {
        var parameters = address.address;
        var update = {};

        update.client_id = parameters.client;
        update.latitude = parameters.latitude;
        update.longitude = parameters.longitude;

        Direccion.findByIdAndUpdate(parameters._id, update, {new: true}, (error, direccionUpdated) => {
            if (error) {
                console.log('status: 500 - Ha ocurrido un error');
            } 

            if (!direccionUpdated) {
                console.log('status: 404 - No se ha podido guardar el documento');
            }

            console.log('status: 200 - Direccion actualizada')
        });
    },

    addressDeleted: function(address) {
        var parameters = address.address;

        Direccion.findByIdAndRemove(parameters._id, (error, direccionRemoved) => {
            if (error) {
                console.log('status: 500 - Ha ocurrido un error');
            } 

            if (!direccionRemoved) {
                console.log('status: 404 - No se ha podido guardar el documento');
            }

            console.log('status: 200 - Direccion eliminada')
        });
    }

}

module.exports = callback;