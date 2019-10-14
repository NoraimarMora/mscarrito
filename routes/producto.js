'use strict'

var express = require('express');
var router = express.Router();
var ProductoController = require('../controllers/producto');

router.post('/', ProductoController.saveProducto);
router.get('/:id', ProductoController.getProducto);
router.get('/', ProductoController.getProductos);
router.put('/update/:id', ProductoController.updateProducto);
router.delete('/delete/:id', ProductoController.deleteProducto);

module.exports = router;