const carrito= [
    {nombre:"Monitor 20 Pulgadas", precio:500},
    {nombre:"TV", precio:100},
    {nombre:"Tablet", precio:200},
    {nombre:"Audifonos", precio:300},
    {nombre:"Teclado", precio:400},
    {nombre:"Celular", precio:700},
    
]




/*for (let i=0; i<carrito.length; i++){
    console.log(`${carrito[i].nombre} - Precio: ${carrito[i].precio}`);
}*/


/*const nuevoarreglo=carrito.forEach((producto)=>{
    return `${producto.nombre} - Precio: ${producto.precio}`;
})*/

const nuevoarreglo=carrito.forEach(producto=>console.log(`${producto.nombre} - Precio: ${producto.precio}`));

/*const nuevoarreglo2=carrito.map((producto)=>{ //nuevo arreglo
    return `${producto.nombre} - Precio: ${producto.precio}`;
})*/

const nuevoarreglo2=carrito.map(producto=>`${producto.nombre} - Precio: ${producto.precio}`);



console.log(nuevoarreglo);
console.log(nuevoarreglo2);
