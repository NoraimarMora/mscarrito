'use strict'

var express = require('express');
var router = express.Router();
var CarritoController = require('../controllers/carrito');

router.post('/', CarritoController.saveCarrito);
router.get('/:id', CarritoController.getCarrito);
router.get('/', CarritoController.getCarritos);
router.put('/update/:id', CarritoController.updateCarrito);
router.delete('/delete/:id', CarritoController.deleteCarrito);

module.exports = router;