'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var { initBroker } = require('./broker');
var { asyncForEach } = require('./utils');
var { MB_URL } = require('./config');

var app = express();
var broker = null;

// Cargar archivos de rutas
var carritoRoutes = require('./routes/carrito');
var caracteristicaRoutes = require('./routes/caracteristica');
var clienteRoutes = require('./routes/cliente');
var direccionRoutes = require('./routes/direccion');
var elementoCarritoRoutes = require('./routes/elementoCarrito');
var productoRoutes = require('./routes/producto');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.get('/', function (req, res) {
  res.send('Microservicio de Carrito');
});

app.use('/carritos', carritoRoutes);
app.use('/caracteristicas', caracteristicaRoutes);
app.use('/clientes', clienteRoutes);
app.use('/direcciones', direccionRoutes);
app.use('/productos', productoRoutes);
app.use('/elementos', elementoCarritoRoutes);

const subscriptions = [
  { queue: 'product-created', callback: () => { } },
  { queue: 'product-updated', callback: () => { } },
  { queue: 'product-deleted', callback: () => { } },
  { queue: 'product-characteristic-created', callback: () => { } },
  { queue: 'product-characteristic-updated', callback: () => { } },
  { queue: 'product-characteristic-deleted', callback: () => { } },
  { queue: 'client-created', callback: () => { } },
  { queue: 'client-updated', callback: () => { } },
  { queue: 'client-deleted', callback: () => { } },
  { queue: 'address-created', callback: () => { } },
  { queue: 'address-updated', callback: () => { } },
  { queue: 'address-deleted', callback: () => { } },
];

const start = async () => {
  broker = await initBroker(MB_URL);

  await asyncForEach(subscriptions, async ({ queue, callback }) => {
    await broker.createChannel()
      .then((ch) => ch.assertQueue(queue)
        .then((_ok) => ch.consume(queue, async (msg) => {
          if (msg !== null) {
            const content = JSON.parse(msg.content.toString());

            callback(content);

            console.log(`[CONSUMER] Acknowledged ${orderId}`);
          }
        }, { noAck: true }))
      ).catch(console.warn);
  });
}

start();


// Exportar
module.exports = app;
