const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');

// Rutas de publicaciones
router.get('/', publicacionController.obtenerPublicaciones);
router.post('/crear', publicacionController.crearPublicacion);

module.exports = router;
