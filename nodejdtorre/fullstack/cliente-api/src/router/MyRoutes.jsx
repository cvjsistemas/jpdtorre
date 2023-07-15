/* eslint-disable no-unused-vars */
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import {CRMProvider} from '../context/CRMContext'

import Clientes from '../components/clientes/Clientes'
import NuevoCliente from '../components/clientes/NuevoCliente';
import EditarCliente from '../components/clientes/EditarCliente';


import Productos from '../components/productos/Productos'
import NuevoProducto from '../components/productos/NuevoProducto'
import EditarProducto from '../components/productos/EditarProducto'

import Pedidos from '../components/pedidos/Pedidos'
import NuevoPedido from '../components/pedidos/NuevoPedido';

import Login from '../components/auth/Login';
import Home from '../components/layout/Home';




const MyRoutes = () => {


  return (
  <BrowserRouter>
      <CRMProvider>
            <Routes>
              <Route exact path="/" element={<Clientes/>} /> 
              <Route exact path="/clientes/nuevo" element={<NuevoCliente/>}/>
              <Route exact path="/clientes/editar/:id" element={<EditarCliente/>} />

              <Route exact path="/productos" element={<Productos/>} /> 
              <Route exact path="/productos/nuevo" element={<NuevoProducto/>} /> 
              <Route exact path="/productos/editar/:id" element={<EditarProducto/>} /> 

              <Route exact path="/pedidos" element={<Pedidos/>} /> 
              <Route exact path="/pedidos/nuevo/:id" element={<NuevoPedido/>} />

              <Route exact path="/iniciar-sesion" element={<Login/>} />
              <Route exact path="/home" element={<Home/>} />
            </Routes>
        </CRMProvider>     
    </BrowserRouter>
  )
}

export default MyRoutes