const mongoose = require('mongoose');

const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    comentarios: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        contenido: {
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            default: Date.now
        }
    }],
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Publicacion', publicacionSchema);
