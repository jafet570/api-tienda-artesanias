const metodoPagoModel = require('../models/metodoPagoModel');
// se realiza llamado al modelo

module.exports = {

    getMetodosPago: (req, res) => {
        metodoPagoModel.getMetodosPago((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    getMetodoPagoById: (req, res) => {
        const { id } = req.params;
        metodoPagoModel.getMetodoPagoById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ message: 'Metodo de pago no encontrado' });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    postMetodoPago: (req, res) => {
        const { nombre } = req.body;
        if (!nombre) {
            res.status(400).json({ message: 'El campo nombre es obligatorio' });
            return;
        }
        metodoPagoModel.postMetodoPago(nombre, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe un metodo de pago con ese nombre' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Metodo de pago creado correctamente', data: { idInsertado: result } });
        });
    },

    putMetodoPago: (req, res) => {
        const { id } = req.params;
        const { nombre } = req.body;
        if (!nombre) {
            res.status(400).json({ message: 'El campo nombre es obligatorio' });
            return;
        }
        metodoPagoModel.putMetodoPago(id, nombre, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe un metodo de pago con ese nombre' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Metodo de pago No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Metodo de pago actualizado correctamente' });
        });
    },

    deleteMetodoPago: (req, res) => {
        const { id } = req.params;
        metodoPagoModel.deleteMetodoPago(id, (err, result) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    res.status(400).json({ error: 'No se puede eliminar el metodo de pago porque esta asociado a pedidos existentes' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Metodo de pago No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Metodo de pago eliminado correctamente' });
        });
    }
};
