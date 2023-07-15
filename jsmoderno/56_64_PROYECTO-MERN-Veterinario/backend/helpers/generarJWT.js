import jwt from 'jsonwebtoken';

const generarJWT = (id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn: "1d" // 1 año
    })
};

export default generarJWT;