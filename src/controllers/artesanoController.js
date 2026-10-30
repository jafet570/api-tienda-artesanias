const artesanoModel = require('../models/artesanoModel');
// se realiza llamado al modelo

module.exports = {

    getArtesanos: (req, res) => {
        artesanoModel.getArtesanos((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    getArtesanoById: (req, res) => {
        const { id } = req.params;
        artesanoModel.getArtesanoById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ message: 'Artesano no encontrado' });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    postArtesano: (req, res) => {
        const { documento, nombre, apellido, email, telefono, ciudad, biografia } = req.body;
        if (!documento || !nombre || !apellido) {
            res.status(400).json({ message: 'Los campos documento, nombre y apellido son obligatorios' });
            return;
        }
        artesanoModel.postArtesano(documento, nombre, apellido, email, telefono, ciudad, biografia, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe un artesano con ese documento o email' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Artesano creado correctamente', data: { idInsertado: result } });
        });
    },

    putArtesano: (req, res) => {
        const { id } = req.params;
        const { documento, nombre, apellido, email, telefono, ciudad, biografia } = req.body;
        if (!documento || !nombre || !apellido) {
            res.status(400).json({ message: 'Los campos documento, nombre y apellido son obligatorios' });
            return;
        }
        artesanoModel.putArtesano(id, documento, nombre, apellido, email, telefono, ciudad, biografia, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe un artesano con ese documento o email' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Artesano No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Artesano actualizado correctamente' });
        });
    },

    deleteArtesano: (req, res) => {
        const { id } = req.params;
        artesanoModel.deleteArtesano(id, (err, result) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    res.status(400).json({ error: 'No se puede eliminar el artesano porque tiene productos vinculados' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Artesano No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Artesano eliminado correctamente' });
        });
    }
};
