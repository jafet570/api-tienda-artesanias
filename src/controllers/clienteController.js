const clienteModel = require('../models/clienteModel');
// se realiza llamado al modelo

module.exports = {

    getClientes: (req, res) => {
        clienteModel.getClientes((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    getClienteById: (req, res) => {
        const { id } = req.params;
        clienteModel.getClienteById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ message: 'Cliente no encontrado' });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    postCliente: (req, res) => {
        const { documento, nombre, apellido, email, password_hash, telefono, direccion, ciudad } = req.body;
        if (!documento || !nombre || !apellido || !email || !password_hash) {
            res.status(400).json({ message: 'Los campos documento, nombre, apellido, email y password_hash son obligatorios' });
            return;
        }
        clienteModel.postCliente(documento, nombre, apellido, email, password_hash, telefono, direccion, ciudad, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe un cliente con ese documento o email' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Cliente creado correctamente', data: { idInsertado: result } });
        });
    },

    putCliente: (req, res) => {
        const { id } = req.params;
        const { documento, nombre, apellido, email, password_hash, telefono, direccion, ciudad } = req.body;
        if (!documento || !nombre || !apellido || !email || !password_hash) {
            res.status(400).json({ message: 'Los campos documento, nombre, apellido, email y password_hash son obligatorios' });
            return;
        }
        clienteModel.putCliente(id, documento, nombre, apellido, email, password_hash, telefono, direccion, ciudad, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Ya existe un cliente con ese documento o email' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Cliente No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Cliente actualizado correctamente' });
        });
    },

    deleteCliente: (req, res) => {
        const { id } = req.params;
        clienteModel.deleteCliente(id, (err, result) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    res.status(400).json({ error: 'No se puede eliminar el cliente porque tiene pedidos históricos registrados' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Cliente No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        });
    }
};
