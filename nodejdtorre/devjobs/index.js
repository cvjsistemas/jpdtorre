import express from "express";
import routes from './routes/routes.js';
import { engine } from 'express-handlebars';
import db from './config/db.js';
import cookieParser from "cookie-parser";
import session from 'express-session';
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import * as hbsHelper from './helpers/handlebars.js';
import flash from 'connect-flash';
import passport from './config/passport.js';


const MongoDBStore = connectMongoDBSession(session);

const app = express();
//habilitar lectura de datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Conexión a la base de datos;

try {
    db();
 
} catch (error) {
    console.log(error)
}



//habilitar engine
app.engine('handlebars', engine({
    defaultLayout:'layout',
    helpers: hbsHelper
}));
app.set('view engine', 'handlebars');




//Carpeta publica
app.use(express.static('public'));


app.use(cookieParser());

app.use(session({
    secret:process.env.SESSION_SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store : new MongoDBStore({
        uri: process.env.DATABASE,
        collection: 'sessions'
      })
    
}));


//inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y flash messages
app.use(flash());

// Crear nuestro middleware
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

//Routing
app.use('/', routes);

const port=process.env.PUERTO || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
