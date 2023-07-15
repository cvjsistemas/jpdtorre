import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import bcrypt from 'bcrypt';

const usuariosSchema = new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    nombre:{
        type:String,
        required:'Agrega tu Nombre'
    },
    password:{
        type:String,
        required:true,
        trim: true
    },
    token:String,
    expira: Date,
    imagen: String

});

//Metodo para hashear los passwords
usuariosSchema.pre('save', async function(next){
    //si el password ya esta hasheado
    if(!this.isModified('password')){
        return next(); //deten la ejecucion
    }
    //si no esta hasheado
    const hash = await bcrypt.hash(this.password,12);
    this.password =hash;
    next();
})
//Enviar alerta cuando un usuario ya esta registrado
usuariosSchema.post('save', function(error,doc,next){
    if(error.name ==='MongoError' && error.code === 11000 ){
        next('Ese correo ya esta registrado');
    } else{
        next(error);
    }
})

//Autenticar Usuario
usuariosSchema.methods = {
    compararPassword : function(password){
        return bcrypt.compareSync(password,this.password);
    }
}

const Usuarios = mongoose.model('Usuarios',usuariosSchema);
export default Usuarios;