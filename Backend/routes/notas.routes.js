const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notas.controller');
const requireAuth = require('../middleware/auth.middleware');

// Protégemos las rutas de notas con JWT
router.post('/notas', requireAuth, notasController.crearNota);
// Obtener todas las notas
router.get('/notas', requireAuth, notasController.obtenerTodasNotas);
// Obtener nota por id
router.get('/notas/:id', requireAuth, notasController.obtenerNotaPorId);
router.put('/notas/:id', requireAuth, notasController.actualizarNota);
router.delete('/notas/:id', requireAuth, notasController.deleteSoftNota);

module.exports = router;
