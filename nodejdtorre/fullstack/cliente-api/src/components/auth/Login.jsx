import {useState} from 'react'
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import { useNavigate } from "react-router-dom";

import useAuth from '../../hooks/useAuth';


const Login = () => {
    const navigate = useNavigate();

    //utilizar valores del context
    const {auth,setAuth} = useAuth();

    console.log(auth);

    //console.log(auth);

    const [credenciales,setCredenciales] =useState({
        email:'',
        password:''
    });

    //almacenar lo que el usuario escribe en el state
    const leerDatos=(e)=>{
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
         })
     //console.log(credenciales);        
    
    }

    const iniciarSesion =async(e)=>{
        e.preventDefault();
        try {

            const respuesta = await clienteAxios.post('/iniciar-sesion',credenciales);
            //console.log(respuesta);
            //extraer el token y colocarlo en localstorage
            const {token} = respuesta.data;
            localStorage.setItem('token',token);

            //colocarlo en el state
           
                // auth.token=token
                // auth.auth=true;
                setAuth({
                    token:token,
                    auth:true
                })
            
            //alerta
            Swal.fire({
                type:'success',
                title:'Login Correcto',
                text:'Has iniciado Sesion' ,
                timer:2000
              })

              navigate('/home');


            
        } catch (error) {
            Swal.fire({
                type:'error',
                title:'Hubo un error',
                text: error.data.mensaje,
                timer:2000
              })
        }
    }

   

  return (
    <>
        <div className="login">
            <h2>Iniciar Sesion</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >

                    <div className="campo">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                            onChange={leerDatos}
                        />
                    </div>
                <input 
                    type="submit"
                    value="Iniciar Sesion"
                    className="btn btn-verde btn-block"
                />
                </form>
            </div>
        </div>
    </>
  )
}

export default Login