import {useContext} from 'react'
import { useNavigate } from "react-router-dom";

import  CRMContext  from '../../context/CRMContext';

const Header = () => {

  const navigate = useNavigate();
    //utilizar valores del context
    const {auth,setAuth} = useContext(CRMContext);

    console.log(auth);

    // if(!auth){
    //   navigate('/iniciar-sesion')
    // }

  const cerrarSesion =()=>{
    setAuth({
      token:'',
      auth:false
    })

    localStorage.setItem('token','');
   navigate('/iniciar-sesion');

  }

  return (
    <>
      <header className="barra">
        <div className="contenedor">
          <div className="contenido-barra">
            <h1>CRM - Administrador de Clientes</h1>

          {auth.auth ? (
              <button 
              type="button" 
              className="btn btn-rojo"
              onClick={cerrarSesion}

              >
              <i className="fa fa-times-circle"></i>
              Cerrar Sesion
            </button>
          ) : ''}
                
    
        

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
