import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";


const registrar=async(req,res)=>{
    try {
        // console.log(req.body);
        const {email,nombre} = req.body;

        //Prevenir un usuario registrado
        const existeusuario = await Veterinario.findOne({email:email});

        if (existeusuario) {
            const error = new Error('Usuario ya registrado');
            return res.status(400).json({msg:error.message});
        }

        const veterinario = new Veterinario(req.body);
        const veterinarioguardado= await veterinario.save();

        // Enviar el email
        emailRegistro({
            email:email,
            nombre:nombre,
            token:veterinarioguardado.token
        });

        res.status(200).json(veterinarioguardado);
    } catch (error) {
        console.log(error);
    }
}

const perfil = (req,res)=>{

    try {  
    const {veterinario} = req.session;
    //console.log(veterinario);

        // res.status(200).json({perfil:veterinario});  
        res.status(200).json(veterinario); 
    } catch (error) {
        console.log(error)
    }


}


const confirmar = async(req,res)=>{
    // console.log(req.params.token);
    const {token} = req.params;
    const usuarioconfirmar = await Veterinario.findOne({token:token});
    //console.log(usuarioconfirmar);
    if (!usuarioconfirmar) {
        const error= new Error('Token no valido');
        return res.status(400).json({msg:error.message});
    }

    try {
        usuarioconfirmar.token=null;
        usuarioconfirmar.confirmado=true;
        await usuarioconfirmar.save();

        res.status(200).json({msg:'Usuario Confirmado Correctamente..'});
        
    } catch (error) {
        console.log(error);
    }

}
const autenticar = async(req,res)=>{
    // console.log(req.body);
    const {email,password} = req.body;
    //comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email:email});

    if (!usuario) {
        const error= new Error('Usuario no existe');
        return res.status(400).json({msg:error.message});
    }

    //comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error= new Error('tu cuenta no ha sido confirmado');
        return res.status(403).json({msg:error.message});
    }

    //Revisar el password
    if(await usuario.comprobarPassword(password)){
        // return res.status(200).json({msg:'Usuario Autenticado Correctamente..'});
        // usuario.token=generarJWT(usuario.id);
        // res.json({token:generarJWT(usuario.id)});
        res.json({
            _id:usuario._id,
            nombre:usuario.nombre,
            email:usuario.email,
            token:generarJWT(usuario.id),
        });
        //Autenticar
    } else{
        const error= new Error('El password es incorrecto');
        return res.status(403).json({msg:error.message});
    }




}

const olvidepassword = async (req,res)=>{
    const {email} = req.body;

    const existeveterinario =await Veterinario.findOne({email:email});

    if (!existeveterinario) {
        const error= new Error('El usuario no existe');
        return res.status(400).json({msg:error.message});
    }

    try {
        existeveterinario.token =generarId();
        await existeveterinario.save();

            // Enviar el email
            emailOlvidePassword({
                email:email,
                nombre:existeveterinario.nombre,
                token:existeveterinario.token
            });

        res.json({msg:'Hemos enviado un email con las instrucciones'});
        
    } catch (error) {
        console.log(error);
    }

}

const comprobartoken = async (req,res)=>{
    const {token} = req.params;
    const tokenvalido = await Veterinario.findOne({token:token});

    if(tokenvalido){
        //el  token si existe
        res.json({msg:'Token valido y el usuario existe'});
    } else {
        const error= new Error('Token no valido');
        return res.status(400).json({msg:error.message});
    }


}


const nuevopassword =async (req,res)=>{
    const {token} = req.params;
    const {password} = req.body;

    const veterinario =  await Veterinario.findOne({token:token});

    if(!veterinario){
        const error = new Error('Hubo un error');
        res.status(400).json({msg: error.message});
       
    }

    try {
        veterinario.token=null;
        veterinario.password=password;
        await veterinario.save();
        res.json({msg:'Password modificado correctamente'});
    } catch (error) {
        console.log(error);
    }

}

const actualizarperfil = async(req,res)=>{
    // console.log(req.params.id);
    // console.log(req.body);
    const veterinario = await Veterinario.findById(req.params.id);
    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg:error.message});
    }
    const {email} = req.body;

    if (veterinario.email !== req.body.email){
        const existeemail = await Veterinario.findOne({email:email});
        if(existeemail){
            const error = new Error('Ese email ya esta en uso');
            return res.status(400).json({msg:error.message});
        }
    }

    try {
        veterinario.nombre= req.body.nombre;
        veterinario.email= req.body.email;
        veterinario.web= req.body.web;
        veterinario.telefono= req.body.telefono;

        const veterinarioactualizado = await veterinario.save();
        res.json(veterinarioactualizado);

    } catch (error) {
        console.log(error);
    }
}

const actualizarpassword = async(req,res)=>{
    // console.log(req.veterinario);
    // console.log(req.body)
    //leer los datos

    const {id} = req.veterinario;
    const {pwd_actual, pwd_nuevo} = req.body;

  //comprobar que el veterinario existe

    const veterinario = await Veterinario.findById(id);
    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg:error.message});
    }
    //comprobar su password
    if(await veterinario.comprobarPassword(pwd_actual)){
        console.log('correcto');
    } else {
        const error = new Error('El password actual es incorrecto');
        return res.status(400).json({msg:error.message});
    }


    //almacenar el nuevo password
    veterinario.password = pwd_nuevo;
    await veterinario.save();
    res.json({msg:'Password Actualizado Correctamente'});
}


export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidepassword,
    comprobartoken,
    nuevopassword,
    actualizarperfil,
    actualizarpassword
}