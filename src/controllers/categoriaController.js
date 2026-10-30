const categoriaModel = require('../models/categoriaModel');
// se realiza llamado al modelo

module.exports = {

    getCategorias: (req, res) => {
        categoriaModel.getCategorias((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    getCategoriaById: (req, res) => {
        const { id } = req.params;
        categoriaModel.getCategoriaById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ message: 'Categoria no encontrado' });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    postCategoria: (req, res) => {
        const { nombre, descripcion } = req.body;
        if (!nombre) {
            res.status(400).json({ message: 'El campo nombre es obligatorio' });
            return;
        }
        categoriaModel.postCategoria(nombre, descripcion, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe una categoria con este nombre' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Categoria creado correctamente', data: { idInsertado: result } });
        });
    },

    putCategoria: (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        if (!nombre) {
            res.status(400).json({ message: 'El campo nombre es obligatorio' });
            return;
        }
        categoriaModel.putCategoria(id, nombre, descripcion, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe una categoria con este nombre' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Categoria No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Categoria actualizado correctamente' });
        });
    },

    deleteCategoria: (req, res) => {
        const { id } = req.params;
        categoriaModel.deleteCategoria(id, (err, result) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    res.status(400).json({ error: 'No se puede eliminar la categoria porque tiene productos asociados' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Categoria No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Categoria eliminado correctamente' });
        });
    }
};
