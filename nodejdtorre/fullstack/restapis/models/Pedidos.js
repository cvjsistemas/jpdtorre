import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    cliente:{
        type:Schema.ObjectId,
        ref:'Clientes'
    },
    pedido:[{
        producto:{
            type: Schema.ObjectId,
            ref:'Productos'
        },
        cantidad: Number
    }],
    total:{
        type:Number
    }

});

const Pedidos = mongoose.model('Pedidos',pedidosSchema);

export default Pedidos;