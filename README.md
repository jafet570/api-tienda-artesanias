# API REST - Tienda de Artesanías de Colombia

API RESTful desarrollada con **Node.js**, **Express.js** y **MySQL** para la gestión integral de una tienda de artesanías colombianas. Conectada a una base de datos relacional desplegada en la nube (**Clever Cloud**).

---

## 📁 Estructura del Proyecto

El proyecto sigue de forma estricta la arquitectura solicitada por el docente (patrón Modelo-Controlador-Ruta con callbacks asíncronos):

```text
api/
├── src/
│   ├── config/
│   │   └── dbConfig.js             # Conexión a MySQL con variables de entorno
│   ├── models/                     # Clases de acceso a datos y sentencias SQL
│   │   ├── categoriaModel.js
│   │   ├── artesanoModel.js
│   │   ├── productoModel.js
│   │   ├── clienteModel.js
│   │   ├── metodoPagoModel.js
│   │   ├── pedidoModel.js
│   │   └── detallePedidoModel.js
│   ├── controllers/                # Manejo de peticiones HTTP, validación y respuestas JSON
│   │   ├── categoriaController.js
│   │   ├── artesanoController.js
│   │   ├── productoController.js
│   │   ├── clienteController.js
│   │   ├── metodoPagoController.js
│   │   ├── pedidoController.js
│   │   └── detallePedidoController.js
│   └── routes/                     # Enrutadores Express para cada entidad
│       ├── categoriaRoutes.js
│       ├── artesanoRoutes.js
│       ├── productoRoutes.js
│       ├── clienteRoutes.js
│       ├── metodoPagoRoutes.js
│       ├── pedidoRoutes.js
│       └── detallePedidoRoutes.js
├── .env.example                    # Plantilla de variables de entorno requeridas
├── .gitignore                      # Exclusión de credenciales y node_modules
├── index.js                        # Punto de entrada de la aplicación
├── package.json                    # Dependencias y scripts
└── README.md                       # Documentación técnica de uso y endpoints
```

---

## ⚙️ Requisitos previos

* **Node.js** (versión 18 o superior)
* **npm** (versión 9 o superior)
* Instancia de **MySQL** (Local o en Clever Cloud)

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO_GITHUB>
   cd api
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Copia el archivo `.env.example` a un nuevo archivo llamado `.env` y completa los datos de tu base de datos (por ejemplo, los de Clever Cloud):
   ```ini
   PORT=3000
   DB_HOST=bxxxxxxxxxxxxxxxxx-mysql.services.clever-cloud.com
   DB_PORT=3306
   DB_NAME=bxxxxxxxxxxxxxxxxx
   DB_USER=uxxxxxxxxxxxxxxxx
   DB_PASSWORD=tu_contraseña_secreta
   ```

4. **Iniciar el servidor:**
   ```bash
   npm start
   ```
   La consola confirmará:
   ```text
   Servidor iniciado en http://localhost:3000
   Conexion MYSQL exitosa
   ```

---

## 📌 Catálogo completo de Endpoints (CRUD)

La API cuenta con operaciones completas de lectura, creación, actualización y eliminación para las 7 entidades de la base de datos:

### 1. Categorías (`/api/categorias`)
| Método | Endpoint | Descripción | Body (JSON) requerido |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categorias/getCategorias` | Listar todas las categorías | No requiere |
| `GET` | `/api/categorias/getCategoriaById/:id` | Obtener una categoría por ID | No requiere |
| `POST` | `/api/categorias/postCategoria` | Crear una nueva categoría | `{"nombre": "Tejidos", "descripcion": "Mochilas y prendas"}` |
| `PUT` | `/api/categorias/putCategoria/:id` | Actualizar una categoría | `{"nombre": "Tejidos Finos", "descripcion": "Prendas premium"}` |
| `DELETE` | `/api/categorias/deleteCategoria/:id` | Eliminar una categoría | No requiere |

---

### 2. Artesanos (`/api/artesanos`)
| Método | Endpoint | Descripción | Body (JSON) requerido |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/artesanos/getArtesanos` | Listar todos los artesanos | No requiere |
| `GET` | `/api/artesanos/getArtesanoById/:id` | Obtener artesano por ID | No requiere |
| `POST` | `/api/artesanos/postArtesano` | Registrar nuevo artesano | `{"documento": "40911201", "nombre": "Rosa", "apellido": "Pushaina", "email": "rosa@example.com", "telefono": "3001112233", "ciudad": "Riohacha", "biografia": "Maestra tejedora"}` |
| `PUT` | `/api/artesanos/putArtesano/:id` | Actualizar artesano | Mismo formato que en POST |
| `DELETE` | `/api/artesanos/deleteArtesano/:id` | Eliminar artesano | No requiere |

---

### 3. Productos (`/api/productos`)
| Método | Endpoint | Descripción | Body (JSON) requerido |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/productos/getProductos` | Listar productos del catálogo | No requiere |
| `GET` | `/api/productos/getProductoById/:id` | Obtener producto por ID | No requiere |
| `POST` | `/api/productos/postProducto` | Crear nuevo producto | `{"codigo": "ART-099", "nombre": "Mochila Wayuu", "descripcion": "Tejida a mano", "precio": 150000, "stock": 10, "activo": 1, "id_categoria": 1, "id_artesano": 1}` |
| `PUT` | `/api/productos/putProducto/:id` | Actualizar producto | Mismo formato que en POST |
| `DELETE` | `/api/productos/deleteProducto/:id` | Eliminar producto | No requiere |

---

### 4. Clientes (`/api/clientes`)
| Método | Endpoint | Descripción | Body (JSON) requerido |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/clientes/getClientes` | Listar compradores | No requiere |
| `GET` | `/api/clientes/getClienteById/:id` | Obtener cliente por ID | No requiere |
| `POST` | `/api/clientes/postCliente` | Registrar cliente | `{"documento": "1043120099", "nombre": "Carlos", "apellido": "García", "email": "carlos@example.com", "password_hash": "HASH_SEGURA", "telefono": "3101234567", "direccion": "Calle 10 #5-20", "ciudad": "Barranquilla"}` |
| `PUT` | `/api/clientes/putCliente/:id` | Actualizar cliente | Mismo formato que en POST |
| `DELETE` | `/api/clientes/deleteCliente/:id` | Eliminar cliente | No requiere |

---

### 5. Métodos de Pago (`/api/metodosPago`)
| Método | Endpoint | Descripción | Body (JSON) requerido |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/metodosPago/getMetodosPago` | Listar medios de pago | No requiere |
| `GET` | `/api/metodosPago/getMetodoPagoById/:id` | Obtener medio de pago por ID | No requiere |
| `POST` | `/api/metodosPago/postMetodoPago` | Registrar método de pago | `{"nombre": "Nequi"}` |
| `PUT` | `/api/metodosPago/putMetodoPago/:id` | Actualizar método de pago | `{"nombre": "Nequi QR"}` |
| `DELETE` | `/api/metodosPago/deleteMetodoPago/:id` | Eliminar método de pago | No requiere |

---

### 6. Pedidos (`/api/pedidos`)
| Método | Endpoint | Descripción | Body (JSON) requerido |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/pedidos/getPedidos` | Listar órdenes de compra | No requiere |
| `GET` | `/api/pedidos/getPedidoById/:id` | Obtener pedido por ID | No requiere |
| `POST` | `/api/pedidos/postPedido` | Registrar nueva compra | `{"id_cliente": 1, "id_metodo_pago": 1, "estado": "pendiente", "direccion_envio": "Carrera 8 #12-30, Cartagena", "total": 150000}` |
| `PUT` | `/api/pedidos/putPedido/:id` | Actualizar estado o datos de envío | Mismo formato que en POST |
| `DELETE` | `/api/pedidos/deletePedido/:id` | Eliminar pedido (y su detalle en cascada) | No requiere |

---

### 7. Detalle de Pedido (`/api/detallePedidos`)
| Método | Endpoint | Descripción | Body (JSON) requerido |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/detallePedidos/getDetallePedidos` | Listar todos los ítems de venta | No requiere |
| `GET` | `/api/detallePedidos/getDetallePedidoById/:id`| Obtener ítem por ID | No requiere |
| `POST` | `/api/detallePedidos/postDetallePedido` | Asociar producto y cantidad a orden | `{"id_pedido": 1, "id_producto": 2, "cantidad": 3, "precio_unitario": 95000}` |
| `PUT` | `/api/detallePedidos/putDetallePedido/:id` | Modificar cantidad o precio pactado | Mismo formato que en POST |
| `DELETE` | `/api/detallePedidos/deleteDetallePedido/:id` | Eliminar línea del pedido | No requiere |

---

## 🛡️ Manejo de errores y códigos de estado HTTP

La API implementa respuestas semánticas en formato JSON y valida las restricciones de base de datos:

* **`200 OK`**: Petición resuelta satisfactoriamente (`GET`, `PUT`, `DELETE`).
* **`201 Created`**: Registro creado con éxito (`POST`), devolviendo el `idInsertado`.
* **`400 Bad Request`**: Datos incompletos, violación de clave foránea o campos duplicados (`ER_DUP_ENTRY`, `ER_NO_REFERENCED_ROW_2`).
* **`404 Not Found`**: El recurso con el ID solicitado no existe en la base de datos (`affectedRows === 0` o `result.length === 0`).
* **`500 Internal Server Error`**: Excepciones no controladas o fallas de comunicación con el motor de base de datos.
