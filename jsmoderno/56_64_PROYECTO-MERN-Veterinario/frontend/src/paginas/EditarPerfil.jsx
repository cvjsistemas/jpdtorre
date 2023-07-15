/* eslint-disable no-unused-vars */
import {useEffect,useState} from 'react';
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from '../components/Alerta.jsx';

const EditarPerfil = () => {

const { auth,actualizarPerfil} = useAuth();
const [perfil,setPerfil]=useState({});
const [alerta,setAlerta]= useState({});

// console.log(perfil);

useEffect(()=>{
  setPerfil(auth);
},[auth])

const handlesubmit = async(e)=>{
  e.preventDefault();

  const {nombre, email} = perfil

  if([nombre,email].includes('')){
    setAlerta({msg:'El nombre y email son obligatorios',error:true});
    return;
  }

  const resultado=await actualizarPerfil(perfil);
  setAlerta(resultado);
}

const { msg } = alerta;


  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
       <span className="text-indigo-600 font-extrabold">Informacion aqui</span>
       </p>

       <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
            
          {msg && <Alerta
                alerta={alerta}
              />} 
            <form 
              onSubmit={handlesubmit}
            >
                <div className="my-3">
                  <label htmlFor="name" className="uppercase font-bold text-gray-600">Nombre</label>
                   <input 
                      type="text"
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                      name="nombre"
                      value={perfil.nombre || ''}
                      onChange={(e)=>setPerfil(
                        {...perfil,
                          [e.target.name]:e.target.value
                        })}
                   />
                </div>

                <div className="my-3">
                  <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio Web</label>
                   <input 
                      type="text"
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                      name="web"
                      value={perfil.web || ''}
                      onChange={(e)=>setPerfil(
                        {...perfil,
                          [e.target.name]:e.target.value
                        })}
                   />
                </div>

                <div className="my-3">
                  <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Telefono</label>
                   <input 
                      type="text"
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                      name="telefono"
                      value={perfil.telefono || ''}
                      onChange={(e)=>setPerfil(
                        {...perfil,
                          [e.target.name]:e.target.value
                        })}
                   />
                </div>

                <div className="my-3">
                  <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                   <input 
                      type="text"
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                      name="email"
                      value={perfil.email || ''}
                      onChange={(e)=>setPerfil(
                        {...perfil,
                          [e.target.name]:e.target.value
                        })}
                   />
                </div>

                <input 
                  type="submit"
                  value="Guardar Cambios"
                  className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full mt-5 uppercase"
                />
            </form>
          </div>
       </div>
    </>
  )
}

export default EditarPerfil