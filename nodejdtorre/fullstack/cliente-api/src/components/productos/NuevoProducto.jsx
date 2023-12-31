
import {useState} from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

import clienteAxios from '../../config/axios';

const NuevoProducto = () => {
  const navigate = useNavigate();

const [producto,setProducto] = useState({
  nombre: '',
  precio:''
});

const [archivo,setArchivo] =useState('');

const leerInformacionProducto = e =>{
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
}

const leerArchivo = e=>{
    setArchivo(e.target.files[0]);
}

const agregarProducto = async(e)=>{
   e.preventDefault();

   //crea un formdata
    const formData = new FormData();
    formData.append('nombre',producto.nombre);
    formData.append('precio',producto.precio);
    formData.append('imagen',archivo);

    //almacenarlo en la BD
    try {
     const res= await clienteAxios.post('/productos',formData,{
            headers:{
              'Content-Type': 'multipart/form-data'
            }
      })
      if(res.status ===200){
          Swal.fire({
              type:'success',
              title:'Agregado correctamente',
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


  return (
    <>
    <h2>NuevoProducto</h2>
    <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                         placeholder="Nombre Producto"
                          name="nombre"
                          onChange={leerInformacionProducto}
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
                        />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"
                      name="imagen"
                      onChange={leerArchivo}
                      />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>

    </>
    
  )
}

export default NuevoProducto