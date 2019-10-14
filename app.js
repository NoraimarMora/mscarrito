'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos de rutas
var carritoRoutes = require('./routes/carrito');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Rutas
app.get('/', function(req, res) {
  res.send('Microservicio de Carrito');
});

app.use('/carritos', carritoRoutes);

// Exportar
module.exports = app;
