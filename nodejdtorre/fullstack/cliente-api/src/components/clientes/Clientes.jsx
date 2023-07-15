
import { useEffect, useState} from 'react';
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { useNavigate } from "react-router-dom";
import Home from '../layout/Home';
import useAuth from '../../hooks/useAuth';


const Clientes = () => {

  const navigate = useNavigate();

const [clientes,setClientes] = useState([]);

const {auth,setAuth} = useAuth();

console.log(auth);

    //utilizar valores del context
    //const token = auth.token;
    const token = localStorage.getItem('token');


useEffect(()=>{


//query al api
const consultarAPI = async()=>{




  if(token !==''){
     try {
      const clientesConsulta = await clienteAxios.get('/clientes',{
        headers:{
          Authorization: `Bearer ${token} `
        }
      });
      //console.log(clientesConsulta.data);
      //colocar el resultado en el state
      setClientes(clientesConsulta.data);
     } catch (error) {
      //Error con authotizacion
        if(error.response.status==500){
          navigate('/iniciar-sesion');
        }

     }


  } else {
    navigate('/iniciar-sesion');
  }
  //console.log(token);


}

    consultarAPI();



},[]);


//spinner de carga
if(!clientes.length) return <Spinner />


  return (
    <>
          <Home />
          <h2>Clientes</h2>


          <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>


          <ul className="listado-clientes">
            {/* Recorrer la lista de usuarios */}
            {clientes.map(cliente=>(
                <Cliente
                    key={cliente._id}
                    cliente={cliente}
                />
            ))}
          </ul>
    </>

  )
}

export default Clientes