import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectardb from './config/db.js';
import veterinarioroutes from './routes/veterinarioroutes.js';
import pacienteroutes from './routes/pacienteroutes.js';
import session from "express-session";



const app=express();
app.use(express.json());

dotenv.config();
// console.log(process.env.MONGO_URI);

conectardb();

const dominiospermitidos = ['http://localhost:5173','http://localhost:4000'];

const corsoptions={
  origin:(origin,callback)=>{
    if(dominiospermitidos.indexOf(origin) !==-1){
      //el origen del request esta pemitido
      callback(null,true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}


// Primero usar la sesión
app.use(session({
    // Se recomienda cambiar en cada entorno
    // https://parzibyte.me/blog/2020/06/02/sesiones-node-express-js/#Configurar_uso_de_sesion
    secret: "123",
    saveUninitialized: true,
    resave: true,
    cookie:{
      maxAge: 60000,
    }
  }));
// app.use(cors(corsoptions));
app.use(cors({
  origin: '*'
}));
app.use('/api/veterinarios',veterinarioroutes);
app.use('/api/paciente',pacienteroutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});