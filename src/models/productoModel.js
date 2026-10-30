const db = require('../config/dbConfig');
// se llama a la configuracion de la bd

class producto {

    getProductos(callback) {
        const sql = "select id_producto, codigo, nombre, descripcion, precio, stock, activo, id_categoria, id_artesano from productos";
        db.query(sql, callback);
    }

    getProductoById(id, callback) {
        const sql = "select id_producto, codigo, nombre, descripcion, precio, stock, activo, id_categoria, id_artesano from productos where id_producto = ?";
        db.query(sql, [id], callback);
    }

    postProducto(codigo, nombre, descripcion, precio, stock, activo, id_categoria, id_artesano, callback) {
        const sql = 'insert into productos(codigo, nombre, descripcion, precio, stock, activo, id_categoria, id_artesano) values (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [codigo, nombre, descripcion, precio, stock, activo, id_categoria, id_artesano], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.insertId);
        });
    }

    putProducto(id, codigo, nombre, descripcion, precio, stock, activo, id_categoria, id_artesano, callback) {
        const sql = 'update productos set codigo = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, activo = ?, id_categoria = ?, id_artesano = ? where id_producto = ?';
        db.query(sql, [codigo, nombre, descripcion, precio, stock, activo, id_categoria, id_artesano, id], callback);
    }

    deleteProducto(id, callback) {
        const sql = 'delete from productos where id_producto = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new producto();
