const db = require('../config/dbConfig');
// se llama a la configuracion de la bd

class artesano {

    getArtesanos(callback) {
        const sql = "select id_artesano, documento, nombre, apellido, email, telefono, ciudad, biografia, fecha_registro from artesanos";
        db.query(sql, callback);
    }

    getArtesanoById(id, callback) {
        const sql = "select id_artesano, documento, nombre, apellido, email, telefono, ciudad, biografia, fecha_registro from artesanos where id_artesano = ?";
        db.query(sql, [id], callback);
    }

    postArtesano(documento, nombre, apellido, email, telefono, ciudad, biografia, callback) {
        const sql = 'insert into artesanos(documento, nombre, apellido, email, telefono, ciudad, biografia) values (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [documento, nombre, apellido, email, telefono, ciudad, biografia], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.insertId);
        });
    }

    putArtesano(id, documento, nombre, apellido, email, telefono, ciudad, biografia, callback) {
        const sql = 'update artesanos set documento = ?, nombre = ?, apellido = ?, email = ?, telefono = ?, ciudad = ?, biografia = ? where id_artesano = ?';
        db.query(sql, [documento, nombre, apellido, email, telefono, ciudad, biografia, id], callback);
    }

    deleteArtesano(id, callback) {
        const sql = 'delete from artesanos where id_artesano = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new artesano();
