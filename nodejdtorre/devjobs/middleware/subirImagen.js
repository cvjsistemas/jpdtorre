import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const subirImagen =(req,res,next)=>{
    upload(req,res,function(error){

      if(error){
            if(error instanceof multer.MulterError){
                if(error.code==='LIMIT_FILE_SIZE'){
                  req.flash('error','El archivo es muy grande: Maeximo 100Kb');
                } else {
                  req.flash('error',error.message);
                }
            } else {
              req.flash('error',error.message);
            }
            res.redirect('/administracion');
            return;
      } else {
        return next();
      }


     
    });

}


const fileStorage = multer.diskStorage({
  destination : (req, file, cb) => {
      cb(null, __dirname +'../../public/uploads/perfiles');
  }, 
  filename : (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
  }
})

const fileFilter=(req, file, cb)=> {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
      // el callback se ejecuta como true o false : true cuando la imagen se acepta
      cb(null, true);
  } else {
      cb(new Error('Formato No Válido'));
  }
}


// Opciones de Multer
const configuracionMulter = {
  limits : { fileSize : 100000 },
  storage: fileStorage ,
  fileFilter: fileFilter

}

const upload =multer(configuracionMulter).single('imagen');

export default subirImagen;