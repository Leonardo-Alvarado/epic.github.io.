const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para el registro e inicio de sesión de usuarios
router.post('/registro', usuarioController.registrarUsuario);
router.post('/login', usuarioController.iniciarSesion);

module.exports = router;
