import {unlink} from 'node:fs/promises'
import {validationResult} from 'express-validator';
import {Categoria,Precio,Propiedad,Mensaje,Usuario} from '../models/index.js';
import {esVendedor,formatearFecha} from '../helpers/index.js';

const admin = async(req,res)=>{

    //Leer QueryString

    const {pagina:paginaActual} = req.query;
    //console.log(paginaActual);
    const expresion = /^[0-9]$/;

    if(!expresion.test(paginaActual)){
        return res.redirect('/mis-propiedades?pagina=1');
    }

    try {

        const {id} = req.usuario;

        //Limites y offset para el paginador
        const limit=10;
        const offset=((paginaActual*limit)- limit);



        //Validar que la propiedad exista
        const [propiedades,total] = await Promise.all([
            Propiedad.findAll({   
                    limit:limit,
                    offset:offset,
                    where:{
                        usuarioId:id
                    },
                    include :[
                        {model: Categoria, as :'categoria'},
                        {model: Precio, as :'precio'},
                        {model: Mensaje, as: 'mensajes'}
                    ]
                
                }),
             Propiedad.count({
                where:{
                    usuarioId:id
                }
             })   
        ])

        // const total=100;
        // console.log(total);
    
        res.render('propiedades/admin',{
            pagina:'Mis Propiedades',
            propiedades: propiedades,
            paginas:Math.ceil(total/limit),
            paginaActual:Number(paginaActual),
            total:total,
            offset:offset,
            limit:limit
        });
        
    } catch (error) {
        console.log(error);
    }

   


}

const crear = async(req,res)=>{
    //Consultar Modelo de Precio y Categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])


    res.render('propiedades/crear',{
        pagina:'Crear Propiedad',
        // csrfToken:req.csrfToken(),
        categorias:categorias,
        precios:precios,
        datos:{}

    });

}

const guardar =async(req,res)=>{
    
    //Validacion
    let resultado = validationResult(req);

    if (!resultado.isEmpty()){

        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

        return res.render('propiedades/crear',{
            pagina:'Crear Propiedad',
            categorias:categorias,
            precios:precios,
            // csrfToken:req.csrfToken(),
            errores: resultado.array(),
            datos: req.body
           
        })
    }

    //Crear un registro
    //console.log(req.body);
    const {
          titulo,
          descripcion,
          habitaciones,
          estacionamiento,
          wc,
          calle,
          lat,
          lng,
          precio,
          categoria
        } = req.body;

        const { id : usuarioId} = req.usuario;
    try {
        const propiedadGuardada = await Propiedad.create({
            titulo:titulo,
            descripcion:descripcion,
            habitaciones:habitaciones,
            estacionamiento:estacionamiento,
            wc:wc,
            calle:calle,
            lat:lat,
            lng:lng,
            precioId : precio,
            categoriaId :categoria,
            usuarioId,
            imagen:''
        })

        const {id} = propiedadGuardada;
        res.redirect(`/propiedades/agregar-imagen/${id}`);
    } catch (error) {
        console.log(error);
    }
}

const agregarImagen = async(req, res) => {

    const {id} = req.params;
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad) {
        return res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad no este publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades');
    }

    // Validar que la propiedad pertenece a quien visita esta pagina
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades');
    }


    res.render('propiedades/agregar-imagen',{
        pagina:`Agregar Imagen: ${propiedad.titulo}`,
        // csrfToken: req.csrfToken(),
        propiedad:propiedad
    })

}

const almacenarImagen = async(req,res)=>{
    console.log(req.file);

    const {id} = req.params;
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad) {
        return res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad no este publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades');
    }

    // Validar que la propiedad pertenece a quien visita esta pagina
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades');
    }

    try {
        propiedad.imagen = req.file.filename;
        propiedad.publicado = 1;

        await propiedad.save();
        res.redirect('/mis-propiedades');
        //Almacenar la imagen y publicar propiedad
        // res.render('templates/mensaje',{
        //     pagina: 'Archivo subido Correctamente',
        //     mensaje:'La imagen fue publicada correctamente'
        // });
        

        
    } catch (error) {
        console.log(error);
    }

}

const editar = async(req,res)=>{

    const {id} = req.params;

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad){
        res.redirect('/mis-propiedades');
    }

    //Revisar que quien visita la Url es quien creo la propiedad

    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        res.redirect('/mis-propiedades');
    }


        //Consultar Modelo de Precio y Categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
    
    
        res.render('propiedades/editar',{
            pagina:`Editar Propiedad : ${propiedad.titulo}`,
            // csrfToken:req.csrfToken(),
            categorias:categorias,
            precios:precios,
            datos:propiedad
    
        });
}

const guardarCambios = async(req,res)=>{


      //Validacion
      let resultado = validationResult(req);

      if (!resultado.isEmpty()){
  
          const [categorias, precios] = await Promise.all([
              Categoria.findAll(),
              Precio.findAll()
          ])
  
          return res.render('propiedades/editar',{
              pagina:`Editar Propiedad`,
              categorias:categorias,
              precios:precios,
              // csrfToken:req.csrfToken(),
              errores: resultado.array(),
              datos: req.body
             
          })
      }

    //Reescribir el objeto
    try {

        const {
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precio:precioId,
            categoria: categoriaId
          } = req.body;


          propiedad.set({
            titulo:titulo,
            descripcion:descripcion,
            habitaciones:habitaciones,
            estacionamiento:estacionamiento,
            wc:wc,
            calle:calle,
            lat:lat,
            lng:lng,
            precioId:precioId,
            categoriaId:categoriaId
          })
          await propiedad.save();
          res.redirect('/mis-propiedades');
        
    } catch (error) {
        console.log(error);
    }


    const {id} = req.params;
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad){
        res.redirect('/mis-propiedades');
    }

    //Revisar que quien visita la Url es quien creo la propiedad

    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        res.redirect('/mis-propiedades');
    }





}

const eliminar = async(req,res)=>{
    

    const {id} = req.params;
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad){
        res.redirect('/mis-propiedades');
    }

    //Revisar que quien visita la Url es quien creo la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        res.redirect('/mis-propiedades');
    }

    //Eliminar la imagen
    await unlink(`public/uploads/${propiedad.imagen}`);

    //Eliminar la propiedad
    await propiedad.destroy();
    res.redirect('/mis-propiedades');
}

//Modifica elestado de la propiedad
const cambiarEstado =  async(req,res)=>{
    const {id} = req.params;
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad){
        res.redirect('/mis-propiedades');
    }

    //Revisar que quien visita la Url es quien creo la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        res.redirect('/mis-propiedades');
    }
    //Actualizar
    propiedad.publicado = !propiedad.publicado;

    await propiedad.save();
    res.json({
        resultado:true
    })
}

//Muestra una propiedad
const mostrarPropiedad = async(req,res)=>{
    
    const {id} = req.params;

    //console.log(req.usuario);
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk( id,
        {
            include :[
            {model: Categoria, as :'categoria'},
            {model: Precio, as :'precio'}
            ]
        } 
    );

    if(!propiedad || !propiedad.publicado){
        return res.redirect('/404')
    }
   // console.log(esVendedor(req.usuario?.id,propiedad.usuarioId));

    res.render('propiedades/mostrar',{
        pagina:propiedad.titulo,
        propiedad: propiedad,
        usuario:req.usuario,
        esVendedor:esVendedor(req.usuario?.id,propiedad.usuarioId)
    })


}

const enviarMensaje = async(req,res)=>{
    const {id} = req.params;
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk( id,
        {
            include :[
            {model: Categoria, as :'categoria'},
            {model: Precio, as :'precio'}
            ]
        } 
    );

    if(!propiedad){
        return res.redirect('/404')
    }
   // console.log(esVendedor(req.usuario?.id,propiedad.usuarioId));
   //Renderizar los errores
     //Validacion
        let resultado = validationResult(req);

        if (!resultado.isEmpty()){

            res.render('propiedades/mostrar',{
                pagina:propiedad.titulo,
                propiedad: propiedad,
                usuario:req.usuario,
                esVendedor:esVendedor(req.usuario?.id,propiedad.usuarioId),
                errores : resultado.array()
            })
          
        }

        const {mensaje} = req.body;
        const {id:propiedadId} = req.params;
        const {id:usuarioId} = req.usuario;
        
        //Almacenar el mensaje
        await Mensaje.create({
            mensaje:mensaje,
            propiedadId:propiedadId,
            usuarioId:usuarioId

        })

    res.render('propiedades/mostrar',{
        pagina:propiedad.titulo,
        propiedad: propiedad,
        usuario:req.usuario,
        esVendedor:esVendedor(req.usuario?.id,propiedad.usuarioId),
        enviado:true
    })
}

//leer mensajes recibidos
const verMensajes = async(req,res)=>{

    const {id} = req.params;
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id,{
        include :[
            {model: Mensaje, as: 'mensajes',
                include:[
                    {model: Usuario.scope('eliminarPassword'), as: 'usuario'}
                ]
            }
        ]
    });

    if(!propiedad){
        res.redirect('/mis-propiedades');
    }

    //Revisar que quien visita la Url es quien creo la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        res.redirect('/mis-propiedades');
    }


    res.render('propiedades/mensajes',{
        pagina:'Mensajes',
        mensajes:propiedad.mensajes,
        formatearFecha

    })
}

export{
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    cambiarEstado,
    mostrarPropiedad,
    enviarMensaje,
    verMensajes
}