/* eslint-disable react/prop-types */
import {useState,useEffect} from 'react'
import Swal from 'sweetalert2';
import { useNavigate,useParams } from "react-router-dom";

import clienteAxios from '../../config/axios';



const EditarCliente = () => {

    //Obtener el ID
    const {id} =useParams();

    //console.log(id);


    const navigate = useNavigate();

    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email:'',
        telefono:''
    });

    //Query a la API
    const consultarAPI = async ()=>{
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        //console.log(clienteConsulta.data);
        setCliente(clienteConsulta.data);
    }


    //useEffect cuando el component carga
    useEffect(()=> {
        consultarAPI();
    },[]);    
    
    //leer los datos del fomulario
    const actualizarState = (e)=>{
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    //Envia una peticion por axios para actualizar el cliente de
    const actualizarCliente = e=>{
        e.preventDefault();

        clienteAxios.put(`/clientes/${cliente._id}`,cliente)
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
                        'Correcto',
                        'Se actualizo Correctamente',
                        'success'
                    )
                }
                  //Redireccionar
                 navigate("/");
            })
    }


    const validarCliente =()=>{
        const{nombre,apellido,empresa, email, telefono} = cliente;
    
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;
    
        return valido;
    }
    


  return (
    <>
    <h2>EditarCliente</h2>
    
       <form 
          onSubmit={actualizarCliente}
       >
          <legend>Llena todos los campos</legend>

          <div className="campo">
              <label>Nombre:</label>
              <input 
              type="text"
              placeholder="Nombre Cliente"
              name="nombre"
              onChange={actualizarState}
              value={cliente.nombre}
              />
          </div>

          <div className="campo">
              <label>Apellido:</label>
              <input type="text"
               placeholder="Apellido Cliente"
                name="apellido"
                onChange={actualizarState}
                value={cliente.apellido}
                />
          </div>

          <div className="campo">
              <label>Empresa:</label>
              <input 
              type="text"
              placeholder="Empresa Cliente"
              name="empresa"
              onChange={actualizarState}
              value={cliente.empresa}
                />
          </div>

          <div className="campo">
              <label>Email:</label>
              <input 
              type="email"
              placeholder="Email Cliente"
              name="email"
              onChange={actualizarState}
              value={cliente.email}
              />
          </div>

          <div className="campo">
              <label>Teléfono:</label>
              <input 
              type="tel"
              placeholder="Teléfono Cliente"
              name="telefono"
              onChange={actualizarState}
              value={cliente.telefono}
              />
          </div>

          <div className="enviar">
                  <input 
                  type="submit"
                  className="btn btn-azul"
                  value="Guardar Cambios"
                  disabled={validarCliente()}
                  />
          </div>

      </form>
  </>
  )
}

export default EditarCliente