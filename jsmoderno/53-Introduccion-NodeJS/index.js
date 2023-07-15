//const express= require('express');
import express from 'express';
import router from './routes/router.js';
import db from './config/db.js';
import dotenv from 'dotenv';
// import dotenv from 'dotenv/config';

dotenv.config();

console.log(process.env.DB_HOST);

const app = express();

//conectar a la base de datos
db.authenticate()
    .then(()=>console.log('Base de datos conectada'))
    .catch(err=>console.log(err));

//definir port

const port = process.env.PORT || 4000

//habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req,res,next) => {

    const year= new Date();

    res.locals.actualyear=year.getFullYear();
    res.locals.nombresitio="Agencia de Viajes";
    //console.log(res.locals);
    next();
})

//agregar bodyparser para lee los datos
app.use(express.urlencoded({extended:true}));

//definir la carpeta publica
app.use(express.static('public'));

//agregar router
app.use('/',router);


app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})