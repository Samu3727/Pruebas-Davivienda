const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notas.controller');
const requireAuth = require('../middleware/auth.middleware');

router.post('/notas', requireAuth, notasController.crearNota);

router.get('/notas', requireAuth, notasController.obtenerTodasNotas);

router.get('/notas/:id', requireAuth, notasController.obtenerNotaPorId);
router.put('/notas/:id', requireAuth, notasController.actualizarNota);
router.delete('/notas/:id', requireAuth, notasController.deleteSoftNota);

module.exports = router;
