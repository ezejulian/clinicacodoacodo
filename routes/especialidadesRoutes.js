// routes/especialidadesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM especialidades', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO especialidades (nombre) VALUES (?)';
    db.query(query, [nombre], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Especialidad agregada correctamente' });
    });
});

module.exports = router;
