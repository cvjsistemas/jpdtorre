/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import { useNavigate,useParams } from "react-router-dom";

import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';

const NuevoPedido = () => {
const navigate = useNavigate();

//extraer ID de cliente
const {id} =useParams();

const [cliente,setCliente] = useState({});
const [busqueda,setBusqueda] =useState('');
const [productos,setProductos] =useState([]);
const [total,setTotal] =useState(0);


const consultarAPI = async()=>{
    const resultado = await clienteAxios.get(`/clientes/${id}`);
    //console.log(resultado.data);
    setCliente(resultado.data);
}

useEffect(()=>{
    //obtener el cliente
    consultarAPI();

    //actualizar el total a pagar
    actualizarTotal();
},[productos])


const buscarProducto = async(e)=>{
 e.preventDefault();

 //obtener los productos de la busqueda
 const resultadoBusqueda =await clienteAxios.post(`/productos/busqueda/${busqueda}`);
  
 //si no hay resultado una alerta, contrario agregarlo al state
 if(resultadoBusqueda.data[0]){
        let productoResultado =resultadoBusqueda.data[0];
        //agregar la llave "producto" (copia de id)
        productoResultado.producto = resultadoBusqueda.data[0]._id;
        productoResultado.cantidad = 0;

        //ponerlo en el state
        setProductos([...productos, productoResultado]);
 } else {
    //no hay resultados
    Swal.fire({
        type:'error',
        title:"No se encontraron coincidencias",
        text:`Intentalo nuevamente con otra palabra`,
        timer:2000
    })
 }
}

const leerDatosBusqueda = (e)=>{
  setBusqueda(e.target.value);
}

//actualizar la cantidad de productos
const restarProductos = (i)=>{
    //console.log('uno menos...',i);
    //copiar el arreglo original de productos
    const todosProductos =[...productos];

    //validar si esta en 0 no puede ir mas alla
    if(todosProductos[i].cantidad ===0) return;
    //restar uno al valor actual del campo cantidad
    todosProductos[i].cantidad--;

    //almacenarlo en el state
    setProductos(todosProductos);
}

const aumentarProductos = (i)=>{
    //console.log('uno mas.....',i);
    //copiar el arreglo original de productos
    const todosProductos =[...productos];

    //incremento
    todosProductos[i].cantidad++;

      //almacenarlo en el state
      setProductos(todosProductos);
}

//Elimina un producto del state
const eliminarProductoPedido = (id)=>{
    //console.log(id);
    const todosProductos = productos.filter(producto =>producto.producto !=id)
    setProductos(todosProductos);
}

//Actualizar el total a pagar
const actualizarTotal = ()=>{
    //si el arreglo de productos es igual a 0, el total es 0
    if(productos.length===0){
        setTotal(0);
        return;
    }

    //calcular el nuevo total
    let nuevoTotal = 0;

    //recorrer todos los productos, sus cantidades y precios
    productos.map(producto=>nuevoTotal += (producto.cantidad)*(producto.precio));

    //almacenar el Total
    setTotal(nuevoTotal);
}

const realizarPedido = async (e)=>{
    e.preventDefault();

    //extraer el ID

    //cosntruir el objeto
    const pedido ={
        "cliente":id,
        "pedido": productos,
        "total":total
    }

    //console.log(pedido);
    const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`,pedido);

    //leer resultado
    if(resultado.status ===200){
    
        Swal.fire({
            type:'success',
            title:"Correcto",
            text:resultado.data.mensaje,
            timer:2000
        })

    } else {
        Swal.fire({
            type:'error',
            title:"Hubo un Error",
            text:`Vuelva a intentarlo`,
            timer:2000
        })
    }
    navigate('/');
}


  return (
    <>
        <h2>NuevoPedido</h2>
    
        <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>
            
            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            
            
            />
         
                <ul className="resumen">
                    {productos.map((producto,index)=>(
                        <FormCantidadProducto
                            key={producto.producto}
                            producto={producto}
                            restarProductos={restarProductos}
                            aumentarProductos={aumentarProductos}
                            eliminarProductoPedido={eliminarProductoPedido}
                            index={index}
                        />
                    ))}
                 
                </ul>
                
                <p className="total">Total a Pagar:
                        <span>$ {total}</span>
                </p>        


                { total>0 ? (
                    <form
                        onClick={realizarPedido}
                    >
                        <input 
                        type="submit"
                        className='btn btn-verde btn-block'
                        value="Realizar Pedido"
                        />
                    </form>
                ):null}
        
    
    </>

    
  )
}

export default NuevoPedido