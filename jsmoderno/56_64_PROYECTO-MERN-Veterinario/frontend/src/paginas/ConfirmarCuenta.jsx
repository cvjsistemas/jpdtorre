import { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import clienteAxios from '../config/axios.jsx';
import Alerta from '../components/Alerta.jsx';
import {Link} from 'react-router-dom';


const ConfirmarCuenta = () => {

  const [cuentaconfirmada,setCuentaconfirmada]= useState(false);
  const [cargando, setCargando]= useState(true);
  const [alerta,setAlerta]= useState('');


  const params =useParams();
  // console.log(params);
  const {id} = params;



  useEffect(()=>{
    const confirmarcuenta = async ()=>{
        try {
          const url =`/veterinarios/confirmar/${id}`;
          const {data} = await clienteAxios(url);
          console.log(data);
          setCuentaconfirmada(true);
          setAlerta({
            msg:data.msg,
            error:false
          })
        } catch (error) {
            // console.log(error);
            setAlerta({
              msg:error.response.data.msg,
              error:true
            })
        }
        setCargando(false);
    }
    confirmarcuenta();
  },[]);
  return (
    <>
        <div>
                <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Comienza a Administra<span className="text-black"> tus Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
           {!cargando &&
             <Alerta
            alerta={alerta}
            />}

            {cuentaconfirmada &&(
                   <Link 
                   className='block text-center my-5 text-gray-500'
                   to="/">Iniciar Sesion</Link>
            )}
            
            </div>
    
    </>
  )
}

export default ConfirmarCuenta;