import express from 'express';
import { body } from 'express-validator'
import {mostrarTrabajos} from '../controllers/homeController.js';
import {
    formCrearCuenta,
    crearUsuario,
    validarRegistro,
    formIniciarSesion,
    formEditarPerfil,
    editarPerfil
} from '../controllers/usuariosController.js';
import {
    formularioNuevaVacante,
    agregarVacante,
    mostrarVacante,
    formEditarVacante,
    editarVacante,
    eliminarVacante,
    contactar,
    mostrarCandidatos,
    BuscarVacantes
} from '../controllers/vacantesController.js';


import { 
    autenticarUsuario,
    mostrarPanel,
    cerrarSesion,
    formReestablecerPassword,
    enviarToken,
    restablecerPassword,
    guardarPassword
} from '../controllers/authController.js';

import verificarUsuario from '../middleware/verificarUsuario.js';

import subirImagen from '../middleware/subirImagen.js';
import subirCv from '../middleware/subirCv.js';

const router = express.Router();

router.get('/',mostrarTrabajos);

//Crear Vacantes
router.get('/vacantes/nueva',verificarUsuario,formularioNuevaVacante);
router.post('/vacantes/nueva',verificarUsuario,

body('titulo').notEmpty().escape().withMessage('Agrega un titulo a la vacante'),
body('empresa').notEmpty().escape().withMessage('Agrega una empresa'),
body('ubicacion').notEmpty().escape().withMessage('Agrega una Ubicacion'),
body('contrato').notEmpty().escape().withMessage('Selecciona el tipo de contrato'),
body('skills').notEmpty().escape().withMessage('Agrega al menos una habilidad')


,agregarVacante);

//mostrar vacante singular
router.get('/vacantes/:url',mostrarVacante);

//editar vacante
router.get('/vacantes/editar/:url',verificarUsuario,formEditarVacante);
router.post('/vacantes/editar/:url',verificarUsuario,

body('titulo').notEmpty().escape().withMessage('Agrega un titulo a la vacante'),
body('empresa').notEmpty().escape().withMessage('Agrega una empresa'),
body('ubicacion').notEmpty().escape().withMessage('Agrega una Ubicacion'),
body('contrato').notEmpty().escape().withMessage('Selecciona el tipo de contrato'),
body('skills').notEmpty().escape().withMessage('Agrega al menos una habilidad')

,editarVacante);

//eliminar vacantes
router.delete('/vacantes/eliminar/:id',eliminarVacante);

//crear cuentas
router.get('/crear-cuenta',formCrearCuenta);
router.post('/crear-cuenta',

body('nombre').notEmpty().escape().withMessage('El Nombre es Obligatorio'),
body('email').isEmail().normalizeEmail().withMessage('El email debe ser valido'),
body('password').notEmpty().escape().withMessage('El password no puede ir vacio'),
body('confirmar').notEmpty().escape().withMessage('Confirmar password no puede ir vacio')
// body('confirmar').equals(req.body.password).withMessage('El password es diferente')
,crearUsuario)

//Autenticar Usuarios
router.get('/iniciar-sesion',formIniciarSesion);
router.post('/iniciar-sesion',autenticarUsuario);
//cerrar sesion
router.get('/cerrar-sesion',verificarUsuario,cerrarSesion);


//resetear password (emails)
router.get('/reestablecer-password',formReestablecerPassword);
router.post('/reestablecer-password',enviarToken);

//resetear password (Almacenar en la BD)
router.get('/restablecer-password/:token',restablecerPassword);
router.post('/restablecer-password/:token',guardarPassword);


//Panel de administracion
router.get('/administracion',verificarUsuario,mostrarPanel);


//Editar Perfil
router.get('/editar-perfil',verificarUsuario,formEditarPerfil);
router.post('/editar-perfil',verificarUsuario,subirImagen,editarPerfil);


// body('nombre').notEmpty().escape().withMessage('El nombre no puede ir vacio'),
// body('email').isEmail().normalizeEmail().withMessage('El email debe ser valido')

//Recibir mensajes de Candidatos
router.post('/vacantes/:url',subirCv, contactar);

//muestra los candidatos por vacante
router.get('/candidatos/:id',verificarUsuario,mostrarCandidatos);


//buscador de vacantes
router.post('/buscador',BuscarVacantes);

export default router;