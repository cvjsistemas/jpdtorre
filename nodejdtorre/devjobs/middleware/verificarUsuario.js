import passport from "passport";

const autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/administracion',
    failureRedirect:'/iniciar-sesion',
    failureFlash:true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

const verificarUsuario =(req,res,next)=>{

    //revisar el usuario
    if(req.isAuthenticated()){
        return next(); //estan autenticados
    }

    //redireccionar
    res.redirect('/iniciar-sesion');

}


export default verificarUsuario;