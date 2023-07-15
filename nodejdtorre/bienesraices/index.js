import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import db from './config/db.js';

//Crear la app
const app = express();

//habilitar lectura de datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Habilitar Cookie Parser
app.use(cookieParser());

//Habilitar CSRF
//app.use(csrf({cookie:true}));

//Conexión a la base de datos;

try {
    await db.authenticate();
    db.sync()//crea la tabla en caso no exista
    console.log('Conexion correcta a la base de datos');
} catch (error) {
    console.log(error)
}

//habilitar pug
app.set('view engine','pug');
app.set('views','./views');

//Carpeta publica
app.use(express.static('public'));

//Routing
app.use('/',appRoutes);
app.use('/auth',usuarioRoutes);
app.use('/',propiedadesRoutes);
app.use('/api',apiRoutes);

const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
