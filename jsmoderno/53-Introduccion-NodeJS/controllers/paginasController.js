import Viaje from '../models/Viajes.js';
import Testimonial from '../models/Testimoniales.js';

const paginainicio = async(req,res)=>{

//consultar 3 viajes del modelo viaje
const promiseDB=[];
promiseDB.push( Viaje.findAll({limit:3}) );
promiseDB.push( Testimonial.findAll({limit:3}) );

try {
    const resultado= await Promise.all(promiseDB);

    // const viajes= await Viaje.findAll({limit:3});
     // const testimoniales= await Testimonial.findAll({limit:3});

    res.render('inicio',{
        pagina: 'Inicio',
        clase:'home',
        viajes:resultado[0],
        testimoniales:resultado[1]
    });
} catch (error) {
    console.log(error);
}

   
}

const paginanosotros =(req,res)=>{
    res.render('nosotros',{pagina:'nosotros'});
}

const paginaviajes=async(req,res)=>{

    const viajes =await Viaje.findAll();

    console.log(viajes)

    res.render('viajes',{
        pagina:'Proximos Viajes',
        viajes:viajes
    });
}

const paginatestimoniales = async(req,res)=>{
    //res.render('testimoniales',{pagina:'testimoniales'});
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina:'testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

const paginadetalleviaje =async(req,res)=>{
    const {slug} = req.params;
    console.log(slug);

    try {
        const viaje = await Viaje.findOne({ where:{ slug:slug}});

        res.render('viaje',{
            pagina:'Informacion viaje',
            viaje:viaje
            
        });
        
    } catch (error) {
        console.log(error);
    }

    //res.status(200).json({viaje:viaje});
}


export {
    paginainicio,
    paginanosotros,
    paginaviajes,
    paginatestimoniales,
    paginadetalleviaje
}