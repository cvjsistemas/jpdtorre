const carrito= [
    {nombre:"Monitor 20 Pulgadas", precio:500},
    {nombre:"TV", precio:100},
    {nombre:"Tablet", precio:200},
    {nombre:"Audifonos", precio:300},
    {nombre:"Teclado", precio:400},
    {nombre:"Celular", precio:700},
    
]

//con un foreach
let total=0;

carrito.forEach((producto)=>{
    return total +=producto.precio;
})
console.log(total);

//con un reduce
let resultado = carrito.reduce((total,producto)=> total +=producto.precio,0);
console.log(resultado);