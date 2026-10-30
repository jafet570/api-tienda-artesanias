const detallePedidoModel = require('../models/detallePedidoModel');
// se realiza llamado al modelo

module.exports = {

    getDetallePedidos: (req, res) => {
        detallePedidoModel.getDetallePedidos((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    getDetallePedidoById: (req, res) => {
        const { id } = req.params;
        detallePedidoModel.getDetallePedidoById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ message: 'Detalle de pedido no encontrado' });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    postDetallePedido: (req, res) => {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
        if (!id_pedido || !id_producto || !cantidad || precio_unitario === undefined) {
            res.status(400).json({ message: 'Los campos id_pedido, id_producto, cantidad y precio_unitario son obligatorios' });
            return;
        }
        detallePedidoModel.postDetallePedido(id_pedido, id_producto, cantidad, precio_unitario, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Este producto ya esta registrado en las lineas de este pedido' });
                    return;
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    res.status(400).json({ error: 'El pedido o el producto especificado no existen' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Detalle de pedido creado correctamente', data: { idInsertado: result } });
        });
    },

    putDetallePedido: (req, res) => {
        const { id } = req.params;
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
        if (!id_pedido || !id_producto || !cantidad || precio_unitario === undefined) {
            res.status(400).json({ message: 'Los campos id_pedido, id_producto, cantidad y precio_unitario son obligatorios' });
            return;
        }
        detallePedidoModel.putDetallePedido(id, id_pedido, id_producto, cantidad, precio_unitario, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Este producto ya esta registrado en las lineas de este pedido' });
                    return;
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    res.status(400).json({ error: 'El pedido o el producto especificado no existen' });
                    return;
                }
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Detalle de pedido No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Detalle de pedido actualizado correctamente' });
        });
    },

    deleteDetallePedido: (req, res) => {
        const { id } = req.params;
        detallePedidoModel.deleteDetallePedido(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Detalle de pedido No Encontrado' });
                return;
            }
            res.status(200).json({ message: 'Detalle de pedido eliminado correctamente' });
        });
    }
};
