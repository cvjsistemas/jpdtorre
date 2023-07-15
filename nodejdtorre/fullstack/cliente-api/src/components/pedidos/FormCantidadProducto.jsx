/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const FormCantidadProducto = (props) => {

    const {producto, restarProductos, aumentarProductos,index,eliminarProductoPedido } = props;

  return (
    <>
      <li>
        <div className="texto-producto">
          <p className="nombre">{producto.nombre}</p>
          <p className="precio">$ {producto.precio}</p>
        </div>
        <div className="acciones">
          <div className="contenedor-cantidad">
            <i 
            className="fas fa-minus"
            onClick={()=>restarProductos(index)}
            
            
            ></i>
            {/* <input type="text" name="cantidad" /> */}
            <p>{producto.cantidad}</p>
            <i 
            className="fas fa-plus"
            onClick={()=>aumentarProductos(index)}
            ></i>
          </div>
          <button 
                type="button"
                 className="btn btn-rojo"
                 onClick={()=>eliminarProductoPedido(producto._id)}
                 >
            <i className="fas fa-minus-circle"></i>
            Eliminar Producto
          </button>
        </div>
      </li>
    </>
  );
};

export default FormCantidadProducto;
