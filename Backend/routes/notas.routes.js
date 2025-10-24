const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notas.controller');

router.post('/notas', notasController.crearNota);
// Obtener todas las notas
router.get('/notas', notasController.obtenerTodasNotas);
// Obtener nota por id
router.get('/notas/:id', notasController.obtenerNotaPorId);
router.put('/notas/:id', notasController.actualizarNota);
router.delete('/notas/:id', notasController.deleteSoftNota);

module.exports = router;
