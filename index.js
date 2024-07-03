// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db');
const medicosRoutes = require('./routes/medicosRoutes');
const especialidadesRoutes = require('./routes/especialidadesRoutes');
const provinciasRoutes = require('./routes/provinciasRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/medicos', medicosRoutes);
app.use('/especialidades', especialidadesRoutes);
app.use('/provincias', provinciasRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'IngresoMedicos.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
