
import Vacantes  from '../models/Vacantes.js'

const mostrarTrabajos = async(req,res,next)=>{

    const vacantes = await Vacantes.find().lean();

    //lean() devuelve un json object en vez de objecto moongoose

    console.log(vacantes);

    if(!vacantes) return next();

    res.render('home',{
        nombrePagina:'devJobs',
        tagline:'Encuentra y Publica trabajos para Desarrolladores Web',
        barra:true,
        boton:true,
        vacantes:vacantes
    })
}





export {
    mostrarTrabajos
}