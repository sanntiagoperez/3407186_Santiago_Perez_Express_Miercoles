const { Router } = require('express');
const mostrarRuta = require('../controllers/rutaPruebaController.js');

const enrutador = Router();

enrutador.get('/listado', mostrarRuta);

module.exports = enrutador;