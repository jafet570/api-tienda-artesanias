const pedidoModel = require('../models/pedidoModel');
// se realiza llamado al modelo

module.exports = {

    getPedidos: (req, res) => {
        pedidoModel.getPedidos((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    getPedidoById: (req, res) => {
        const { id } = req.params;
        pedidoModel.getPedidoById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ message: 'Pedido no encontrado' });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    postPedido: (req, res) => {
        const { id_cliente, id_metodo_pago, estado, direccion_envio, total } = req.body;
        if (!id_cliente || !id_metodo_pago || !direccion_envio) {
            res.status(400).json({ message: 'Los campos id_cliente, id_metodo_pago y direccion_envio son obligatorios' });
            return;
        }
        pedidoModel.postPedido(id_cliente, id_metodo_pago, estado || 'pendiente', direccion_envio, total || 0, (err, result) => {
            if (err) {
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    res.status(400).json({ error: 'El cliente o el metodo de pago especificado no existen' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Pedido creado correctamente', data: { idInsertado: result } });
        });
    },

    putPedido: (req, res) => {
        const { id } = req.params;
        const { id_cliente, id_metodo_pago, estado, direccion_envio, total } = req.body;
        if (!id_cliente || !id_metodo_pago || !direccion_envio) {
            res.status(400).json({ message: 'Los campos id_cliente, id_metodo_pago y direccion_envio son obligatorios' });
            return;
        }
        pedidoModel.putPedido(id, id_cliente, id_metodo_pago, estado || 'pendiente', direccion_envio, total || 0, (err, result) => {
            if (err) {
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    res.status(400).json({ error: 'El cliente o el metodo de pago especificado no existen' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pedido No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Pedido actualizado correctamente' });
        });
    },

    deletePedido: (req, res) => {
        const { id } = req.params;
        pedidoModel.deletePedido(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pedido No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Pedido eliminado correctamente' });
        });
    }
};
