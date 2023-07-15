import mongoose  from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";


const veterinarioSchema =mongoose.Schema({
    nombre: {type: String, required: true,trim:true},
    password:{type: String, required:true,trim:true},
    email:{type: String, required:true,trim:true,unique:true},
    telefono:{type:String,default:null,trim:true},
    web:{type:String,default:null,trim:true},
    token:{type:String,default:generarId ? generarId() : Date.now() },
    confirmado:{type:Boolean, default: false},
    
});

veterinarioSchema.pre('save',async function(next){
    // console.log("Antes de almacener...");
    if(!this.isModified('password')){
        next();
    }    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});


veterinarioSchema.methods.comprobarPassword = async function(passwordformulario){
    return await bcrypt.compare(passwordformulario,this.password);
}

const Veterinario =mongoose.model("veterinario",veterinarioSchema);


export default Veterinario;