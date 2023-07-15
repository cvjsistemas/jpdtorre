import express from 'express';
import {nuevoCliente,
        mostrarClientes,
        mostrarCliente,
        actualizarCliente,
        eliminarCliente
    } from '../controllers/clienteController.js';

import subirImagen from '../helpers/subirImagen.js';
import {nuevoProducto,
        mostrarProductos,
        mostrarProducto,
        actualizarProducto,
        eliminarProducto,
        buscarProducto
    } from '../controllers/productoController.js';

import {
    nuevoPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
} from '../controllers/pedidoController.js';


import {
    registrarUsuario,
    autenticarUsuario

} from '../controllers/usuarioController.js';


import protegerRuta from '../middleware/protegerRuta.js';

const router = express.Router();



//CLIENTES

//agrega nuevo clientes via post
router.post('/clientes',nuevoCliente);

//obtener todos los clientes
router.get('/clientes',protegerRuta,mostrarClientes);

//muestra un cliente en especifico (id)
router.get('/clientes/:idcliente',mostrarCliente);

//actualizar cliente
router.put('/clientes/:idcliente',actualizarCliente);

//eliminar cliente
router.delete('/clientes/:idcliente',eliminarCliente);




//PRODUCTOS

//agrega nuevos productos
router.post('/productos',subirImagen,nuevoProducto);

//muestra todos los productos
router.get('/productos',mostrarProductos);

//muestra un producto por ID
router.get('/productos/:idproducto',mostrarProducto);

//actualizar productos
router.put('/productos/:idproducto',subirImagen,actualizarProducto);

//eliminar productos
router.delete('/productos/:idproducto',eliminarProducto);

//busqueda productos
router.post('/productos/busqueda/:query', buscarProducto);


//PEDIDOS

//agregar pedidos
router.post('/pedidos/nuevo/:idusuario',nuevoPedido);

//mostrar pedidos
router.get('/pedidos',mostrarPedidos);

//mostrar pedido por su ID
router.get('/pedidos/:idpedido',mostrarPedido);

//actualizar pedido
router.put('/pedidos/:id',actualizarPedido);

//eliminar pedido
router.delete('/pedidos/:id',eliminarPedido);


//USUARIOS

router.post('/crear-cuenta',registrarUsuario);
router.post('/iniciar-sesion',autenticarUsuario);

export default router;