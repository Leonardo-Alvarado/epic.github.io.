const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar datos JSON
app.use(express.json());

// Servir archivos estáticos desde el directorio frontend
app.use(express.static(path.resolve(__dirname, '..', 'frontend')));

// Configurar la ruta para manejar la solicitud del archivo index.html
app.get('/index.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});

// Configurar la ruta para manejar la solicitud del archivo principal.html
app.get('/principal.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'principal.html'));
});

// Rutas de usuarios
app.use('/usuarios', usuarioRoutes);

// Conexión a la base de datos
mongoose.connect('mongodb+srv://joseinguevaracunalata:MongoDB202301@mongo202301.fqdr4ee.mongodb.net/epic', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}).catch(error => console.error('Error al conectar a la base de datos:', error));
