import {useEffect,useState} from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';

const Pedidos = () => {

const [pedidos,setPedidos] = useState([]);


  const consultarAPI =async ()=>{
      const resultado = await clienteAxios.get('/pedidos');
      setPedidos(resultado.data);
  }

useEffect(()=>{
    consultarAPI();
},[]);

  return (
    <>
        <div>Pedidos</div>

        <ul className="listado-pedidos">
            {pedidos.map(pedido=>(
                  <DetallesPedido
                  key={pedido._id}
                  pedido={pedido}
                  />
              ))}

              
        
            </ul>

    </>
    
  )
}

export default Pedidos