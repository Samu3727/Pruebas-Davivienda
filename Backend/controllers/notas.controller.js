const db = require('../models/conexion');

const crearNota = async (req, res) => {
    const { titulo, descripcion, contenido } = req.body;
    try {
        const [result] = await db.query('INSERT INTO notas (titulo, descripcion, contenido) VALUES (?, ?, ?)', [titulo, descripcion, contenido]);
        res.status(201).json({ id: result.insertId, titulo, descripcion, contenido });
    } catch (error) {
        console.error('Error al crear nota:', error);
        res.status(500).json({ error: 'Error al crear nota' });
    }
};


const obtenerNotaPorId = async (req, res) => {
    const { id } = req.params;  
    try {
        const [notas] = await db.query('SELECT * FROM notas WHERE id = ?', [id]);   
        if (notas.length === 0) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }
        res.status(200).json(notas[0]);
    } catch (error) {               
        console.error('Error al obtener nota:', error);
        res.status(500).json({ error: 'Error al obtener nota' });
    }   
};

const obtenerTodasNotas = async (req, res) => {
    try {
        // Seleccionamos notas activas (estado = 1) o sin campo estado
        const [notas] = await db.query('SELECT * FROM notas WHERE estado IS NULL OR estado = 1');
        res.status(200).json(notas);
    } catch (error) {
        console.error('Error al obtener notas:', error);
        res.status(500).json({ error: 'Error al obtener notas' });
    }
};

const actualizarNota = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, contenido } = req.body;
    try {
        const [result] = await db.query('UPDATE notas SET titulo = ?, descripcion = ?, contenido = ? WHERE id = ?', [titulo, descripcion, contenido, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }
        res.status(200).json({ id, titulo, descripcion, contenido });
    } catch (error) {
        console.error('Error al actualizar nota:', error);
        res.status(500).json({ error: 'Error al actualizar nota' });
    }
};

const deleteSoftNota = async (req, res) => {
    const { id } = req.params;  
    try {
        const [result] = await db.query('UPDATE notas SET estado = 0 WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }
        res.status(200).json({ id });
    } catch (error) {
        console.error('Error al eliminar nota:', error);
        res.status(500).json({ error: 'Error al eliminar nota' });
    }
};

module.exports = {
    crearNota,
    obtenerNotaPorId,
    obtenerTodasNotas,
    actualizarNota,
    deleteSoftNota
};
