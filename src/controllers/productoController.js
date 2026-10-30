const productoModel = require('../models/productoModel');
// se realiza llamado al modelo

module.exports = {

    getProductos: (req, res) => {
        productoModel.getProductos((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    getProductoById: (req, res) => {
        const { id } = req.params;
        productoModel.getProductoById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    postProducto: (req, res) => {
        const { codigo, nombre, descripcion, precio, stock, activo, id_categoria, id_artesano } = req.body;
        if (!codigo || !nombre || precio === undefined || !id_categoria || !id_artesano) {
            res.status(400).json({ message: 'Los campos codigo, nombre, precio, id_categoria e id_artesano son obligatorios' });
            return;
        }
        productoModel.postProducto(codigo, nombre, descripcion, precio, stock ?? 0, activo ?? 1, id_categoria, id_artesano, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe un producto con ese codigo' });
                    return;
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    res.status(400).json({ error: 'La categoria o el artesano especificado no existen' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Producto creado correctamente', data: { idInsertado: result } });
        });
    },

    putProducto: (req, res) => {
        const { id } = req.params;
        const { codigo, nombre, descripcion, precio, stock, activo, id_categoria, id_artesano } = req.body;
        if (!codigo || !nombre || precio === undefined || !id_categoria || !id_artesano) {
            res.status(400).json({ message: 'Los campos codigo, nombre, precio, id_categoria e id_artesano son obligatorios' });
            return;
        }
        productoModel.putProducto(id, codigo, nombre, descripcion, precio, stock ?? 0, activo ?? 1, id_categoria, id_artesano, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe un producto con ese codigo' });
                    return;
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    res.status(400).json({ error: 'La categoria o el artesano especificado no existen' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Producto No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Producto actualizado correctamente' });
        });
    },

    deleteProducto: (req, res) => {
        const { id } = req.params;
        productoModel.deleteProducto(id, (err, result) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    res.status(400).json({ error: 'No se puede eliminar el producto porque ya forma parte del detalle de un pedido' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Producto No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        });
    }
};
