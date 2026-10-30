const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const categoriaRoutes = require('./src/routes/categoriaRoutes');
const artesanoRoutes = require('./src/routes/artesanoRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const metodoPagoRoutes = require('./src/routes/metodoPagoRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const detallePedidoRoutes = require('./src/routes/detallePedidoRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rutas
app.use('/api/categorias', categoriaRoutes);
app.use('/api/artesanos', artesanoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/metodosPago', metodoPagoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/detallePedidos', detallePedidoRoutes);

// Ruta base de bienvenida y estado
app.get('/', (req, res) => {
    res.json({
        message: 'API REST - Tienda de Artesanias',
        estado: 'Activa',
        version: '1.0.0'
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log("Servidor iniciado en http://localhost:" + port);
});
