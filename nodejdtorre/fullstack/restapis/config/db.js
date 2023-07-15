import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path:'.env'});


const db =()=> {
   mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true
 })
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log(err);
});


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



// mongoose.connect(process.env.DATABASE,{
//     useNewUrlParser:true
// })

// mongoose.connection.on('error',(error)=>{
//     console.log(error);
// })

export default db;