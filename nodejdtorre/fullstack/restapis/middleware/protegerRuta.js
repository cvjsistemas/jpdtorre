import jwt from 'jsonwebtoken';


const protegerRuta =(req,res,next)=>{

    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    //obtener el token y verificarlo
    const token = authHeader.split(' ')[1];
    let revisarToken;

    try {
        revisarToken = jwt.verify(token,process.env.SECRET);
        console.log(revisarToken);
    } catch (error) {
        error.statusCode=500;
        throw error;
    }

    //Si es un token valido , pero hay un error;
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();

}


export default protegerRuta;