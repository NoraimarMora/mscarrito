'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos de rutas
var carritoRoutes = require('./routes/carrito');
var caracteristicaRoutes = require('./routes/caracteristica');
var clienteRoutes = require('./routes/cliente');
var direccionRoutes = require('./routes/direccion');
var elementoCarritoRoutes = require('./routes/elementoCarrito');
var productoRoutes = require('./routes/producto');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Rutas
app.get('/', function(req, res) {
  res.send('Microservicio de Carrito');
});

app.use('/carritos', carritoRoutes);
app.use('/caracteristicas', caracteristicaRoutes);
app.use('/clientes', clienteRoutes);
app.use('/direcciones', direccionRoutes);
app.use('/productos', productoRoutes);
app.use('/elementos', elementoCarritoRoutes);

// Exportar
module.exports = app;
