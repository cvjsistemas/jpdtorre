import express from 'express';
import checkAuth from '../middleware/authMiddleware.js'
import {
    agregarpaciente,
    obtenerpacientes,
    obtenerpaciente,
    actualizarpaciente,
    eliminarpaciente
} 
        from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/',checkAuth,agregarpaciente);//OK
router.get('/',checkAuth,obtenerpacientes);//OK
router.get('/:id',checkAuth,obtenerpaciente);//OK
router.put('/:id',checkAuth,actualizarpaciente);//OK
router.delete('/:id',checkAuth,eliminarpaciente);


// router.route('/') .post(agregarpaciente).get(obtenerpaciente)



export default router;