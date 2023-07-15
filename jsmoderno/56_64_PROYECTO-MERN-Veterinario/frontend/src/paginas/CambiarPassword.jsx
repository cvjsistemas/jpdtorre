/* eslint-disable no-unused-vars */
import {useState} from 'react';
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from '../hooks/useAuth';

const CambiarPassword = () => {

const [alerta,setAlerta] = useState({});
const [password,setPassword] = useState({
  pwd_actual:'',
  pwd_nuevo:'',
});

const {guardarpassword } = useAuth();


  const handlesubmit = async(e)=>{
    e.preventDefault();

    // console.log(Object.values(password).some(campo=>campo===''));
    if(Object.values(password).some(campo=>campo==='')){
      setAlerta({msg:'Todos los campos son obligatorios',error:true});
      return;
    }

    if(password.pwd_nuevo.length<6){
      setAlerta({msg:'El password debe tener minimo 6 caracteres',error:true});
      return;
    }


   const respuesta= await guardarpassword(password);

   setAlerta(respuesta);

  }

  const {msg} = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
       <span className="text-indigo-600 font-extrabold">Password aqui</span></p>

       <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          {msg && <Alerta
                alerta={alerta}
              />} 
         <form 
              onSubmit={handlesubmit}
            >
               

                <div className="my-3">
                  <label htmlFor="email" className="uppercase font-bold text-gray-600">Password Actual</label>
                   <input 
                      type="password"
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                      name="pwd_actual"
                      placeholder='Escribe tu password actual'
                      onChange={e=> setPassword({
                        ...password,
                        [e.target.name]: e.target.value
                      })}
                   />
                </div>

                <div className="my-3">
                  <label htmlFor="email" className="uppercase font-bold text-gray-600">Password Nuevo</label>
                   <input 
                      type="password"
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                      name="pwd_nuevo"
                      placeholder='Escribe tu nuevo password'
                      onChange={e=> setPassword({
                        ...password,
                        [e.target.name]: e.target.value
                      })}
                   />
                </div>

                <input 
                  type="submit"
                  value="Actualizar Password"
                  className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full mt-5 uppercase"
                />
            </form>
       </div>
      </div> 
    </>
  )
}

export default CambiarPassword