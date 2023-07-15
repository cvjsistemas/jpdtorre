import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const usuariosSchema = new mongoose.Schema({

    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    nombre:{
        type: String,
        required:'Agrega tu nombre'
    },
    password:{
        type:String,
        required:true
    }

})

const Usuarios = mongoose.model('Usuarios',usuariosSchema);

export default Usuarios;