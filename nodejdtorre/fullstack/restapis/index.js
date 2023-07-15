import express from 'express';
import router from './routes/routes.js';
import db from './config/db.js';
import cors from 'cors';


const app = express();

//habilitar lectura de datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//habilitar cors
app.use(cors());
 

//bd
try {
    db();
} catch (error) {
    console.log(error);
}


//routing
app.use('/',router);

//carpeta publica
app.use(express.static('uploads'));


const port = 3000;
app.listen(port,()=>{
    console.log(`server corriendo en el puerto ${port}`);
});