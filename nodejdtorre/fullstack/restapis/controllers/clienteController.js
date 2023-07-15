import Clientes from "../models/Clientes.js";

const nuevoCliente = async(req,res,next)=>{
    //console.log(req.body)
    // const {email} = req.body;

    // const repetido = await Clientes.findOne({email: email});

    // if(repetido){
    //     return  res.json({mensaje: 'El correo ya existe'});
    // }

    const cliente = new Clientes(req.body);

    try {
        //almacenar el registro
        await cliente.save();
        res.json({mensaje:'Se agrego un nuevo cliente'});
    } catch (error) {
        //console.log(error);
        res.send(error);
        next();
    }
}

const mostrarClientes = async(req,res)=>{

    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }

    
}

const mostrarCliente = async(req,res,next)=>{
    const {idcliente} = req.params;


    const cliente = await Clientes.findById(idcliente);

    if(!cliente){
        res.json({mensaje:'Ese cliente no existe'});
        next();
    }

    //mostrar el cliente
    res.json(cliente);
}

const actualizarCliente = async(req,res,next)=>{
    const {idcliente} = req.params;
    try {
        const cliente = await Clientes.findOneAndUpdate({_id:idcliente},req.body,{
            new:true
        });
        res.json(cliente);
    } catch (error) {
            res.send(error);
            next();
    }
}

const eliminarCliente = async(req,res,next)=>{
    const { idcliente } = req.params;

    try {
        await Clientes.findOneAndDelete({_id:idcliente});
        res.json({mensaje:'El cliente se ha eliminado'});
    } catch (error) {

        console.log(error);
        next();
        
    }
}




export {
    nuevoCliente,
    mostrarClientes,
    mostrarCliente,
    actualizarCliente,
    eliminarCliente
}