/* eslint-disable react-hooks/exhaustive-deps */

import {useState,useEffect} from 'react'
import Swal from 'sweetalert2';
import { useNavigate,useParams } from "react-router-dom";

import clienteAxios from '../../config/axios';

const EditarProducto = () => {
  const navigate = useNavigate();

    //Obtener el ID
    const {id} =useParams();
    console.log(id);

    const [producto,setProducto] = useState({
      nombre: '',
      precio:'',
      imagen:''
    });


    const [archivo,setArchivo] =useState('');

    const editarProducto = async(e)=>{
      e.preventDefault();

      //crea un formdata
    const formData = new FormData();
    formData.append('nombre',producto.nombre);
    formData.append('precio',producto.precio);
    formData.append('imagen',archivo);

    //almacenarlo en la BD
    try {
     const res= await clienteAxios.put(`/productos/${id}`,formData,{
            headers:{
              'Content-Type': 'multipart/form-data'
            }
      })
      if(res.status ===200){
          Swal.fire({
              type:'success',
              title:'Editado Correctamente',
              text: res.data.mensaje,
              timer:2000
            })
      }
      navigate('/productos');
      
    } catch (error) {
       console.log(error);
       Swal.fire({
         type:'error',
         title:'Hubo un error',
         text: 'No se pudo guardar el producto',
         timer:2000
       })
    }



    }



const leerInformacionProducto = e =>{
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
}

const leerArchivo = e=>{
    setArchivo(e.target.files[0]);
}


     //Query a la API
     const consultarAPI = async ()=>{
        const productoConsulta = await clienteAxios.get(`/productos/${id}`);
        setProducto(productoConsulta.data);
     }

     useEffect(()=>{
      consultarAPI();
     },[])

     //extraer los valores  del state
     const {nombre, precio, imagen} = producto;


  return (
    <>
    <h2>EditarProducto</h2>
    <form onSubmit={editarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                         placeholder="Nombre Producto"
                          name="nombre"
                          onChange={leerInformacionProducto}
                          defaultValue={nombre}
                          />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                    type="number"
                     name="precio"
                      min="0.00"
                       step="0.01"
                        placeholder="Precio"
                        onChange={leerInformacionProducto}
                        defaultValue={precio}
                        />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? (
                        <img src={`http://localhost:3000/${imagen}`} alt="imagen" width="300" />
                    ) : null}
                    <input type="file"
                      name="imagen"
                      onChange={leerArchivo}
                      />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>
            </form>

    </>
  )
}

export default EditarProducto