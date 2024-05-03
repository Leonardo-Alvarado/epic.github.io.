const Publicacion = require('../models/publicacionModel');

module.exports = {
    async obtenerPublicaciones(req, res) {
        try {
            const publicaciones = await Publicacion.find();
            res.status(200).json(publicaciones);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las publicaciones' });
        }
    },

    async crearPublicacion(req, res) {
        try {
            const nuevaPublicacion = new Publicacion(req.body);
            await nuevaPublicacion.save();
            res.status(201).json({ mensaje: 'Publicación creada exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la publicación' });
        }
    }
};
