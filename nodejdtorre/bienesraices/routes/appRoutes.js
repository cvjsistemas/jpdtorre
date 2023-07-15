import express from 'express';
const router = express.Router();
import {
    inicio,
    categoria,
    noEncontrado,
    buscador
} from '../controllers/appController.js'; 

//Pagina de Inicio
router.get('/',inicio);

//Categorias
router.get('/categorias/:id',categoria);

//Pagina 404
router.get('/404',noEncontrado)

// Buscador
router.post('/buscador',buscador);


export default router;