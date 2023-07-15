import Usuarios from '../models/Usuarios.js';
import { check, validationResult} from 'express-validator';

const formCrearCuenta = (req,res)=>{
 res.render('crear-cuenta',{
    nombrePagina:'Crea tu cuenta en deJobs',
    tagline:'Comienza a publicas tus vacantes gratis, solo debes crear una cuenta'
 })

}

const validarRegistro =(req,res,next)=>{
   
//   check('nombre').notEmpty().escape().withMessage('El Nombre es Obligatorio').run(req)
//   check('email').isEmail().normalizeEmail().withMessage('El email debe ser valido').run(req)
//   check('password').notEmpty().escape().withMessage('El password no puede ir vacio').run(req)
//   check('confirmar').notEmpty().escape().withMessage('Confirmar password no puede ir vacio').run(req)
//   check('confirmar').equals(req.body.password).withMessage('El password es diferente').run(req)

 check('nombre').notEmpty().escape().withMessage('El Nombre es Obligatorio').run(req),
 check('email').isEmail().normalizeEmail().withMessage('El email debe ser valido').run(req),
 check('password').notEmpty().escape().withMessage('El password no puede ir vacio').run(req),
 check('confirmar').notEmpty().escape().withMessage('Confirmar password no puede ir vacio').run(req),
 check('confirmar').equals(req.body.password).withMessage('El password es diferente').run(req)

   
 return;

}

const crearUsuario =async (req,res,next)=>{
      // Validación
      let errores = validationResult(req);
    //   console.log(resultado);
    //   return;
      if(!errores.isEmpty()) {

        req.flash('error',errores.errors.map(error=>error.msg));
        //console.log(req.flash());
        //return;
        return  res.render('crear-cuenta', {
                nombrePagina:'Crea tu cuenta en deJobs',
                tagline:'Comienza a publicas tus vacantes gratis, solo debes crear una cuenta',
                mensajes: req.flash()
                // errors: resultado.array()
                });
       
      }

    //crear el usuario
    const usuario = new Usuarios(req.body);
    //console.log(usuario);

   
    try {
      await usuario.save();
      res.redirect('/iniciar-sesion');

    } catch (error) {
        req.flash('error',error);
        res.redirect('/crear-cuenta');
    }

   
}


const formIniciarSesion = (req,res)=>{
  res.render('iniciar-sesion',{
    nombrePagina:'Iniciar Sesión deJobs'
 })
}

const formEditarPerfil =(req,res)=>{

 // Validación
 let errores = validationResult(req);
 //   console.log(resultado);
 //   return;
   if(!errores.isEmpty()) {

     req.flash('error',errores.errors.map(error=>error.msg));
     //console.log(req.flash());
     //return;
     return  res.render('crear-cuenta', {
              nombrePagina: 'Edita tu perfil en devJobs',
              usuario:usuario,
              cerrarSesion:true,
              nombre: req.user.nombre,
              mensajes: req.flash()
             // errors: resultado.array()
             });
    
   }

   const usuario = req.user;

    res.render('editar-perfil',{
      nombrePagina: 'Edita tu perfil en devJobs',
      usuario:usuario,
      cerrarSesion:true,
      nombre: req.user.nombre,
      imagen: req.user.imagen
    })
}

const editarPerfil =async(req,res)=>{
  const usuario =await Usuarios.findById(req.user._id);

  usuario.nombre = req.body.nombre;
  usuario.email =req.body.email;
  if(req.body.password){
    usuario.password = req.body.password;
  }


if(req.file){
   usuario.imagen = req.file.filename;
}


  await usuario.save();

  req.flash('correcto','Cambios Guardados Correctamente')

  //redirect
  res.redirect('/administracion');
}




export{
    formCrearCuenta,
    crearUsuario,
    validarRegistro,
    formIniciarSesion,
    formEditarPerfil,
    editarPerfil
}