'use strict'

var express = require('express');
var router = express.Router();
var CarritoController = require('../controllers/carrito');

router.post('/', CarritoController.saveCarrito);
router.post('/elemento/:id', CarritoController.addElementoCarrito);
router.get('/:id', CarritoController.getCarrito);
router.get('/', CarritoController.getCarritos);
router.get('/cliente/:id', CarritoController.getCarritoByCliente);
router.put('/update/:id', CarritoController.updateCarrito);
router.delete('/delete/:id', CarritoController.deleteCarrito);
router.delete('/elemento/:id', CarritoController.deleteElementoCarrito);

module.exports = router;