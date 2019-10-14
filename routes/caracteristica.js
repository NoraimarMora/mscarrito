'use strict'

var express = require('express');
var router = express.Router();
var CaracteristicaController = require('../controllers/caracteristica');

router.post('/', CaracteristicaController.saveCaracteristica);
router.get('/:id', CaracteristicaController.getCaracteristica);
router.get('/', CaracteristicaController.getCaracteristicas);
router.put('/update/:id', CaracteristicaController.updateCaracteristica);
router.delete('/delete/:id', CaracteristicaController.deleteCaracteristica);

module.exports = router;