import passport from "passport";
import Vacantes  from '../models/Vacantes.js'
import Usuarios from '../models/Usuarios.js'
import { generarId } from "../helpers/tokens.js";
import {emailOlvidePassword} from "../helpers/emails.js";

const autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/administracion',
    failureRedirect:'/iniciar-sesion',
    failureFlash:true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

const mostrarPanel =async (req,res)=>{

    //consultar el usuario autenticado
    const vacantes = await Vacantes.find({autor:req.user._id}).lean();

    console.log(vacantes);


    res.render('administracion',{
        nombrePagina:'Panel de Admnistracion',
        tagline:'Crea y Administra tus vacantes desde aqui',
        vacantes:vacantes,
        cerrarSesion:true,
        imagen:req.user.imagen,
        nombre: req.user.nombre
    })
}

const cerrarSesion = (req,res)=>{
    req.logout();
    req.flash('correcto','Cerraste Sesion correctamente')
    return res.redirect('/iniciar-sesion');
}


const formReestablecerPassword = (req,res)=>{
    res.render('reestablecer-password',{
        nombrePagina:'Reestablecer tu Password',
        tagline: "Si ya tienes una cuenta pero olvidaste tu password, coloca tu email"
    })
}

//genera el token en la tabla del usuario
const enviarToken=async(req,res)=>{
    const {email} = req.body;
    const usuario = await Usuarios.findOne({email:email});

    if(!usuario){
        req.flash('error','No existe esa cuenta');
        return res.redirect('/iniciar-sesion');
    }

    //el usuario existe, generar token
    usuario.token=generarId();
    usuario.expira = Date.now() + 36000000;

    //Guardar el usuario
    await usuario.save();
    const resetUrl =`http://${req.headers.host}/restablecer-password/${usuario.token}`;

    //TODO
    console.log(resetUrl);
    req.flash('correcto','Revisa tu email para las indicaciones');

    //enviar email
    const datos ={
        email:req.body.email,
        nombre:usuario.nombre,
        token:usuario.token,
        resetUrl:resetUrl
    }


    emailOlvidePassword(datos);
    res.redirect('/iniciar-sesion');

}

const restablecerPassword =async (req, res) => {

    const usuario = await Usuarios.findOne({ 
        token: req.params.token, 
        expira:{ 
            $gt :Date.now()
        }
    })

    if(!usuario){
        req.flash('error','El formulario ya no es valido, intenta de nuevo');
        return res.redirect('/reestablecer-password');
    }

    //todo bien moestrar el formulario para
    res.render('nuevo-password',{
        nombrePagina : 'Nuevo password'
    })
}

const guardarPassword = async(req,res)=>{
    const usuario = await Usuarios.findOne({ 
        token: req.params.token, 
        expira:{ 
            $gt :Date.now()
        }
    })

    if(!usuario){
        req.flash('error','El formulario ya no es valido, intenta de nuevo');
        return res.redirect('/reestablecer-password');
    }

    //guardar en la base de datos
    usuario.password = req.body.password;
    usuario.token="";
    usuario.expira="";

    await usuario.save();

    req.flash('correcto','Password Modificado Correctamente');
    res.redirect('/iniciar-sesion');
}


export{
    autenticarUsuario,
    mostrarPanel,
    cerrarSesion,
    formReestablecerPassword,
    enviarToken,
    restablecerPassword,
    guardarPassword
}