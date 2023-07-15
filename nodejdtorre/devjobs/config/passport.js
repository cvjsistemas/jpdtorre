import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Usuarios from "../models/Usuarios.js";

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},async(email,password,done)=>{
    const usuario = await Usuarios.findOne({email:email}).lean();

    if(!usuario) return done(null,false,{
        message:'Usuario no Existente'
    });

    // usuario existe, vamos a verificarlo
    const verificarPass = usuario.compararPassword(password);
    if(!verificarPass) return done(null,false,{
        message:'Password Incorrecto'
    });

    //usuario exitse y el password es correcto
    return done(null, usuario);
}));

passport.serializeUser((usuario,done)=>done(null,usuario._id));

passport.deserializeUser(async(id,done)=>{
    const usuario = await Usuarios.findById(id).lean();
    return done(null, usuario);
})

export default passport;