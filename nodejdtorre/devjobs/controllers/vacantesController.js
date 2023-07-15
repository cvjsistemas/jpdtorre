import Vacantes  from '../models/Vacantes.js';
import { check, validationResult} from 'express-validator';


const formularioNuevaVacante = (req,res)=>{
    res.render('nueva-vacante',{
        nombrePagina:'Nueva Vacante',
        tagline:'Llena el formulario y publica tu vacante',
        cerrarSesion:true,
        nombre: req.user.nombre,
        imagen: req.user.imagen
    })
}

const agregarVacante =async(req,res)=>{

      // Validación
    let errores = validationResult(req);
    //   console.log(resultado);
    //   return;
    if(!errores.isEmpty()) {

        req.flash('error',errores.errors.map(error=>error.msg));
        //console.log(req.flash());
        //return;
        return  res.render('nueva-vacante', {
                nombrePagina:'Nueva Vacante',
                tagline:'Llena el formulario y publica tu vacante',
                mensajes: req.flash(),
                cerrarSesion:true,
                nombre: req.user.nombre
                // errors: resultado.array()
                });
    }


    const vacante = new Vacantes(req.body);
    //usuario autor de la vacante
    vacante.autor=req.user._id;


    try {
             //console.log(req.body);
            const {skills} = req.body;
            //crear arreglo d habilidades(skills)
            vacante.skills = skills.split(',');
            //almacenarlo en la BD
            const nuevaVacante = await vacante.save();
            // console.log(nuevaVacante);
            // return;

            //redireccionar
            res.redirect(`/vacantes/${nuevaVacante.url}`);
    } catch (error) {
        console.log(error);
    }
    

}


const mostrarVacante = async(req,res,next)=>{

    const {url} = req.params;
    const vacante = await Vacantes.findOne({url:url}).populate('autor').lean();

    //si no hay resultados
    if(!vacante) return next();

    res.render('vacante',{
        vacante:vacante,
        nombrePagina: vacante.titulo,
        barra:true
    })
}

const formEditarVacante =async (req,res,next)=>{
    const {url} = req.params;
    const vacante = await Vacantes.findOne({url:url}).lean();

    //si no hay resultados
    if(!vacante) return next();

    res.render('editar-vacante',{
        vacante:vacante,
        nombrePagina :`Editar -${vacante.titulo}`,
        cerrarSesion:true,
        nombre: req.user.nombre,
        imagen: req.user.imagen
    })
}

const editarVacante = async(req,res)=>{

       // Validación
       let errores = validationResult(req);
       //   console.log(resultado);
       //   return;
       if(!errores.isEmpty()) {
   
           req.flash('error',errores.errors.map(error=>error.msg));
           //console.log(req.flash());
           //return;
           return  res.render('nueva-vacante', {
                   nombrePagina:'Nueva Vacante',
                   tagline:'Llena el formulario y publica tu vacante',
                   mensajes: req.flash(),
                   cerrarSesion:true,
                   nombre: req.user.nombre
                   // errors: resultado.array()
                   });
       }










    const {skills} = req.body;
    const {url} = req.params;

    const vacanteActualizada = req.body;
    vacanteActualizada.skills = skills.split(',');
  
    const vacante = await Vacantes.findOneAndUpdate({url:url},vacanteActualizada,{
        new: true,
        runValidators: true
    });

    res.redirect(`/vacantes/{vacante.url}`);

 
  


}

const eliminarVacante =async (req,res)=>{
    const {id} = req.parmas;
 

    const vacante = await Vacantes.findById(id);

    if(verificarAutor(vacante,req.user)){
        //todo bien si es el usuario eliminar
        vacante.remove();
        res.status(200).send('Vacante Eliminada Correctamente');
    } else{
        //no permitido
        res.status(403).send('Error');
    }


   
}

const verificarAutor = (vacante ={},usuario={})=>{
    if(!vacante.autor.equals(usuario._id)){
        return false;
    }
    return true;
}



//almacenar los candidatos en la BD
const contactar =async(req,res,next)=>{
    const {url}=req.params;

    const {nombre,email} = req.body;
    const vacante = await Vacantes.findOne({url:url});

    //sino existe la vacante
    if(!vacante) return next();

    //todo bien, construir el nuevo objeto
    const nuevoCandidato ={
        nombre : nombre,
        email: email,
        cv: req.file.filename
    }

    //almacenar la vacante
    vacante.candidatos.push(nuevoCandidato);
    await vacante.save();

    //mensaje flahs y redireccion
    req.flash('correcto','Se envio tu CV correctamente');
    res.redirect('/');


}


const mostrarCandidatos =async (req,res,next)=>{
    const {id} = req.params;

    const vacante = await Vacantes.findById(id).lean();

    if(vacante.autor !=req.user._id.toString()) {
        return next();
    }

    if(!vacante) return next();

    res.render('candidatos',{
        nombrePagina :`Candidatos Vacante -${vacante.titulo}`,
        cerrarSesion: true,
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        candidatos: vacante.candidatos

    })

   
}

const BuscarVacantes =async(req,res)=>{
    const vacantes = await Vacantes.find({
        $text:{
            $search :req.body.q
        }
    });

    //mostrar las vacantes
    res.render('home',{ 
        nombrePagina:`Resultados de la busqueda : ${req.body.q}`,
        barra:true,
        vacantes:vacantes
    })
}



export{
    formularioNuevaVacante,
    agregarVacante,
    mostrarVacante,
    formEditarVacante,
    editarVacante,
    eliminarVacante,
    contactar,
    mostrarCandidatos,
    BuscarVacantes
}