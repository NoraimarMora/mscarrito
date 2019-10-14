'use strict'

var express = require('express');
var router = express.Router();
var ClienteController = require('../controllers/cliente');

router.post('/', ClienteController.saveCliente);
router.get('/:id', ClienteController.getCliente);
router.get('/', ClienteController.getClientes);
router.put('/update/:id', ClienteController.updateCliente);
router.delete('/delete/:id', ClienteController.deleteCliente);

module.exports = router;