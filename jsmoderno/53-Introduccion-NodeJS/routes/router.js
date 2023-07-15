import express from 'express';
import { 
  paginainicio,
  paginanosotros,
  paginaviajes,
  paginatestimoniales,
  paginadetalleviaje } from '../controllers/paginasController.js';
import { guardartestimonial } from '../controllers/testimonialController.js';  

const router= express.Router();

router.get('/',paginainicio);
 
 router.get('/nosotros',paginanosotros);

  router.get('/viajes',paginaviajes);
  router.get('/viajes/:slug',paginadetalleviaje);

router.get('/testimoniales',paginatestimoniales);

router.post('/testimoniales',guardartestimonial);
 
//   router.get('/contacto',(req,res) =>{
//      res.status(200).send('Contacto');
//   });

  export default router;
