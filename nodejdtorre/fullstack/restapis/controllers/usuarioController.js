import Usuarios from "../models/Usuarios.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registrarUsuario =async(req,res)=>{

    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password,12);

    try {
        await usuario.save();
        res.json({mensaje:'Usuario Creado Correctamente'});
        
    } catch (error) {
        console.log(error);
        res.json({mensaje:'Hubo un error'});
    }

}

const autenticarUsuario =async(req,res,next)=>{
    //buscar el usuario
    const {email,password} = req.body;
    const usuario = await Usuarios.findOne({email: email});

    if(!usuario){
        await res.status(401).json({mensaje:'Ese usuario no existe'});
        next();
    } else{
        if(!bcrypt.compareSync(password,usuario.password)){
            await  res.status(401).json({mensaje:"Contraseña incorrecta"});
            next();
        } else {

            const token=jwt.sign({
                email:usuario.email,
                nombre:usuario.nombre,
                _id:usuario._id
            },process.env.SECRET,{expiresIn:30*60});

            //retorna el token
           return res.json({token});
          
        }
    }
}


export{
    registrarUsuario,
    autenticarUsuario
}