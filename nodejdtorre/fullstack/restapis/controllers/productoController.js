import Productos from "../models/Productos.js";


const nuevoProducto =async (req,res,next)=>{
    const producto = new Productos(req.body);

    try {
        if(req.file){
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({mensaje:'Se agrego un nuevo producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}

const mostrarProductos =async(req,res,next)=>{

    try{
     
        const productos = await Productos.find({});
        res.json(productos);
    }catch(error){
        console.log(error);
        next();
    }

}

const mostrarProducto = async(req,res,next)=>{
    const {idproducto} = req.params;

    const producto = await Productos.findById(idproducto);

    if (!producto){
        res.json({mensaje:'Producto no encontrado'});
        return next();
    }

    //mostrar el producto
    res.json(producto);

}

const actualizarProducto=async(req,res,next)=>{
    const {idproducto} = req.params;
    try {
     

        //construir nuevo producto
        const nuevoProducto = req.body;

        //verificar si hay imagen nueva
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        } else {
            const productoAnterior = await Productos.findById(idproducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }
        const producto = await Productos.findOneAndUpdate({_id:idproducto},nuevoProducto,{
            new:true
        });
        res.json(producto);
    } catch (error) {
            console.log(error);
            next();
    }
}

const eliminarProducto =async(req,res,next)=>{
    const { idproducto } = req.params;

    try {
        await Productos.findOneAndDelete({_id:idproducto});
        res.json({mensaje:'El Producto se ha eliminado'});
    } catch (error) {

        console.log(error);
        next();
        
    }
}

const buscarProducto = async (req,res,next)=>{

    const {query} = req.params;

    try {
        const producto = await Productos.find({ nombre: new RegExp(query,'i')});
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        next();
    }
}



export{
    nuevoProducto,
    mostrarProductos,
    mostrarProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProducto
}