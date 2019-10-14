'use strict'

var express = require('express');
var router = express.Router();
var DireccionController = require('../controllers/direccion');

router.post('/', DireccionController.saveDireccion);
router.get('/:id', DireccionController.getDireccion);
router.get('/', DireccionController.getDirecciones);
router.put('/update/:id', DireccionController.updateDireccion);
router.delete('/delete/:id', DireccionController.deleteDireccion);

module.exports = router;