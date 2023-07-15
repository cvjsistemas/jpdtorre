function creariterador(carrito) {
   
    let i=0;

    return {
        siguiente: ()=>{
            const fin = (i>=carrito.length);
            const valor=!fin ? carrito[i++] : undefined;

            return{
                fin,
                valor
            }
        }
    }
}


const carrito = ['Producto 1', 'Producto 2', 'Producto 3'];

//utilizar el iterador
const recorrercarrito = creariterador(carrito);

console.log(recorrercarrito.siguiente());
console.log(recorrercarrito.siguiente());
console.log(recorrercarrito.siguiente());
console.log(recorrercarrito.siguiente());
