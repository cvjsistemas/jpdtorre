/* eslint-disable react/prop-types */
import {useState} from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

import clienteAxios from '../../config/axios';


const NuevoCliente = () => {
const navigate = useNavigate();

const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email:'',
    telefono:''
});

//leer los datos del fomulario
const actualizarState = (e)=>{
    setCliente({
        ...cliente,
        [e.target.name]: e.target.value
    })
}

//Añade en la REST API un cliente nuevo
const agregarCliente = (e)=>{
    e.preventDefault();

    clienteAxios.post('/clientes',cliente)
        .then(res=>{
            //validar si hay error de mongo
            if(res.data.code === 11000){
            // if(res.data.mensaje === 'El correo ya existe'){    
                //console.log('Error de duplicado de Mongo');
                Swal.fire({
                    type: 'error',
                    title: "Hubo un error",
                    text:'El correo ya existe'
                })
            }else{
                //console.log(res.data);
                Swal.fire(
                    'Agregado!',
                    res.data.mensaje,
                    'success'
                )
            }
            //Redireccionar
            navigate("/");

        });

}

//validar fomulario
const validarCliente =()=>{
    const{nombre,apellido,empresa, email, telefono} = cliente;

    let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

    return valido;
}


  return (
    <>
      <h2>NuevoCliente</h2>
      
         <form 
            onSubmit={agregarCliente}
         >
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input 
                type="text"
                placeholder="Nombre Cliente"
                name="nombre"
                onChange={actualizarState}
                />
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input type="text"
                 placeholder="Apellido Cliente"
                  name="apellido"
                  onChange={actualizarState}
                  />
            </div>

            <div className="campo">
                <label>Empresa:</label>
                <input 
                type="text"
                placeholder="Empresa Cliente"
                name="empresa"
                onChange={actualizarState}
                  />
            </div>

            <div className="campo">
                <label>Email:</label>
                <input 
                type="email"
                placeholder="Email Cliente"
                name="email"
                onChange={actualizarState}
                />
            </div>

            <div className="campo">
                <label>Teléfono:</label>
                <input 
                type="tel"
                placeholder="Teléfono Cliente"
                name="telefono"
                onChange={actualizarState}
                />
            </div>

            <div className="enviar">
                    <input 
                    type="submit"
                    className="btn btn-azul"
                    value="Agregar Cliente"
                    disabled={validarCliente()}
                    />
            </div>

        </form>
    </>

  )
}

export default NuevoCliente