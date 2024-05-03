const Usuario = require('../models/usuarioModel');

module.exports = {
    async registrarUsuario(req, res) {
        try {
            const usuario = new Usuario(req.body);
            await usuario.save();
            res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
        } catch (error) {
            console.error(error);
            if (error.name === 'ValidationError') {
                res.status(400).json({ error: 'Datos de usuario no válidos' });
            } else if (error.code === 11000) {
                res.status(400).json({ error: 'El correo electrónico ya está en uso' });
            } else {
                res.status(500).json({ error: 'Error al registrar usuario' });
            }
        }
    },

    async iniciarSesion(req, res) {
        const { email, password } = req.body;
        try {
            const usuario = await Usuario.findOne({ email, password });
            if (usuario) {
                res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
            } else {
                res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }
};
