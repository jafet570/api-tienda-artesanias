const db = require('../config/dbConfig');
// se llama a la configuracion de la bd

class pedido {

    getPedidos(callback) {
        const sql = "select id_pedido, id_cliente, id_metodo_pago, fecha_pedido, estado, direccion_envio, total from pedidos";
        db.query(sql, callback);
    }

    getPedidoById(id, callback) {
        const sql = "select id_pedido, id_cliente, id_metodo_pago, fecha_pedido, estado, direccion_envio, total from pedidos where id_pedido = ?";
        db.query(sql, [id], callback);
    }

    postPedido(id_cliente, id_metodo_pago, estado, direccion_envio, total, callback) {
        const sql = 'insert into pedidos(id_cliente, id_metodo_pago, estado, direccion_envio, total) values (?, ?, ?, ?, ?)';
        db.query(sql, [id_cliente, id_metodo_pago, estado, direccion_envio, total], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.insertId);
        });
    }

    putPedido(id, id_cliente, id_metodo_pago, estado, direccion_envio, total, callback) {
        const sql = 'update pedidos set id_cliente = ?, id_metodo_pago = ?, estado = ?, direccion_envio = ?, total = ? where id_pedido = ?';
        db.query(sql, [id_cliente, id_metodo_pago, estado, direccion_envio, total, id], callback);
    }

    deletePedido(id, callback) {
        const sql = 'delete from pedidos where id_pedido = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new pedido();
