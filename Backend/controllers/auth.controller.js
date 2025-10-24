const db = require('../models/conexion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_for_prod';
const JWT_EXPIRES_IN = '2h';

const register = async (req, res) => {
    const correo = req.body.email || req.body.correo;
    const contrasena = req.body.password || req.body.contrasena;
    if (!correo || !contrasena) {
        return res.status(400).json({ error: 'correo/email y contrasena/password son requeridos' });
    }

    try {
        const [existing] = await db.query('SELECT id FROM usuarios WHERE correo = ?', [correo]);
        if (existing && existing.length > 0) {
            return res.status(409).json({ error: 'El correo ya está registrado' });
        }

        const hashed = await bcrypt.hash(contrasena, 10);
        const [result] = await db.query('INSERT INTO usuarios (correo, contrasena) VALUES (?, ?)', [correo, hashed]);
        const userId = result.insertId;

        const token = jwt.sign({ id: userId, correo }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json({ token, user: { id: userId, correo } });
    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const login = async (req, res) => {
    const correo = req.body.email || req.body.correo;
    const contrasena = req.body.password || req.body.contrasena;
    if (!correo || !contrasena) {
        return res.status(400).json({ error: 'Correo/email y contrasena/password son requeridos' });
    }

    try {
        const [rows] = await db.query('SELECT id, correo, contrasena FROM usuarios WHERE correo = ?', [correo]);
        if (!rows || rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = rows[0];
        const hash = user.contrasena;
        let match = false;
        if (typeof hash === 'string' && hash.startsWith('$2')) {
            match = await bcrypt.compare(contrasena, hash);
        } else {
            match = contrasena === hash;
        }

        if (!match) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.id, correo: user.correo }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        const userSafe = { id: user.id, correo: user.correo };
        res.status(200).json({ token, user: userSafe });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    login,
    register
};
