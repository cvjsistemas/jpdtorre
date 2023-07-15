
import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";



const checkAuth =async (req,res,next)=>{
    //console.log('desde mi middleware');
    let token;
    //console.log(req.headers.authorization)
    // return;
 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // console.log('Si tiene el token con bearer');
        try {
        
            
            token= req.headers.authorization.split(' ')[1];
            //  console.log(token);

            const decoded =jwt.verify(token, process.env.JWT_SECRET);
             //console.log(decoded);
            
            const veterinario =await Veterinario.findById(decoded.id).select("-password -token -confirmado");
            //console.log(veterinario);

            //datos.id = veterinario._id;
            // req.session.nombre = veterinario.nombre;
            // req.session.email = veterinario.email;
            req.session.veterinario = veterinario;
        
            return next();

        } catch (error) {
            const e = new Error('Token no valido');
            res.status(400).json({msg: e.message});
            return;
        }
    } 

    if(!token){
        const error = new Error('Token no valido o inexistente');
        res.status(400).json({msg: error.message});
       
    }
  
    next();
 
}


export default checkAuth;