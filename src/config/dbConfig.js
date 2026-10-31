let mysql;
try {
    mysql = require('mysql2');
} catch (e) {
    mysql = require('mysql');
}
require('dotenv').config();

// Pool de conexiones: reabre solas las conexiones que la base cierra por inactividad,
// asi la API no se apaga con el error PROTOCOL_CONNECTION_LOST.
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tienda_artesanias',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexion MySQL:', err.code);
        return;
    }
    console.log('Conexion MYSQL exitosa');
    connection.release();
});

module.exports = db;
