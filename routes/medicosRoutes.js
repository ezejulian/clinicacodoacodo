const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los médicos
router.get('/', (req, res) => {
    db.query('SELECT * FROM medicos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Obtener médico por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM medicos WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Médico no encontrado' });
        }
        res.json(results[0]);
    });
});

// Obtener médicos por provincia
router.get('/provincia/:provincia_id', (req, res) => {
    const { provincia_id } = req.params;
    const query = `
        SELECT m.*, e.nombre AS especialidad, p.nombre AS provincia 
        FROM medicos m
        JOIN especialidades e ON m.especialidad_id = e.id
        JOIN provincias p ON m.provincia_id = p.id
        WHERE m.provincia_id = ?;
    `;
    db.query(query, [provincia_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Crear un nuevo médico
router.post('/', (req, res) => {
    const { nombre, apellido, email, telefono, direccion, ciudad, dni, especialidad_id, provincia_id, fecha_nacimiento } = req.body;
    const query = 'INSERT INTO medicos (nombre, apellido, email, telefono, direccion, ciudad, dni, especialidad_id, provincia_id, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, apellido, email, telefono, direccion, ciudad, dni, especialidad_id, provincia_id, fecha_nacimiento], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Médico agregado correctamente' });
    });
});

// Editar un médico existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, ciudad, dni, especialidad_id, provincia_id, fecha_nacimiento } = req.body;
    const query = 'UPDATE medicos SET nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ?, ciudad = ?, dni = ?, especialidad_id = ?, provincia_id = ?, fecha_nacimiento = ? WHERE id = ?';
    db.query(query, [nombre, apellido, email, telefono, direccion, ciudad, dni, especialidad_id, provincia_id, fecha_nacimiento, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Médico actualizado correctamente' });
    });
});

// Eliminar un médico existente
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM medicos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Médico eliminado correctamente' });
    });
});

module.exports = router;
