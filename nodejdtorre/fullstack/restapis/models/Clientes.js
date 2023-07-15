import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const clientesSchema = new mongoose.Schema({
    nombre:{
        type:String,
        trim:true,
    },
    apellido:{
        type:String,
        trim: true
    },
    empresa:{
        type: String,
        trim:true
    },
    email :{
        type: String,
        unique:true,
        lowercase:true,
        trim:true
    },
    telefono:{
        type:String,
        trim:true
    }
});


const Clientes = mongoose.model('Clientes',clientesSchema);
export default Clientes;