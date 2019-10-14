'use strict'

var express = require('express');
var router = express.Router();
var ElementoCarritoController = require('../controllers/elementoCarrito');

router.post('/', ElementoCarritoController.saveElementoCarrito);
router.get('/:id', ElementoCarritoController.getElementoCarrito);
router.get('/', ElementoCarritoController.getElementosCarrito);
router.put('/update/:id', ElementoCarritoController.updateElementoCarrito);
router.delete('/delete/:id', ElementoCarritoController.deleteElementoCarrito);

module.exports = router;