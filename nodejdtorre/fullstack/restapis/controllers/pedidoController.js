import Pedidos from "../models/Pedidos.js";

const nuevoPedido =async(req,res,next)=>{

    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({mensaje:'Se agrego un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }

}

const mostrarPedidos = async(req,res,next)=>{
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model:'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

const mostrarPedido = async(req,res,next)=>{
    const {idpedido} = req.params;

    const pedido = await Pedidos.findById(idpedido).populate('cliente').populate({
        path: 'pedido.producto',
        model:'Productos'
    });

    if(!pedido){
        res.json({mensaje:"No se encontro el pedido"});
        return next();
    }

    res.json(pedido);
}


const actualizarPedido = async(req,res,next)=>{
    const {idpedido} = req.params;

    try {
        const pedido = await Pedidos.findOneAndUpdate({_id:idpedido},req.body,{
            new:true
        })
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model:'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next() ;
    }
}

const eliminarPedido = async(req,res,next)=>{
    const {idpedido} = req.params;

    try {
        await Pedidos.findOneAndDelete({_id:idpedido});
        res.json({mensaje:'Pedido Eliminado Correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }

}



export{
    nuevoPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
}