import express from 'express';
import {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidepassword,
    comprobartoken,
    nuevopassword,
    actualizarperfil,
    actualizarpassword
} from '../controllers/veterinarioController.js';
import checkAuth from "../middleware/authMiddleware.js";
 
const router=express.Router();

//area publica
router.post("/",registrar);
router.get('/confirmar/:token',confirmar);
router.post('/login',autenticar);
router.post('/olvide-password',olvidepassword);
router.get('/olvide-password/:token',comprobartoken);
router.post('/olvide-password/:token',nuevopassword);

//otra alternativa
// router.route('/olvide-password/:token').get(comprobartoken).post(nuevopassword);

//area privada
router.get('/perfil',checkAuth,perfil);
router.put('/perfil/:id',checkAuth,actualizarperfil);
router.put('/actualizar-password',checkAuth,actualizarpassword);


export default router;