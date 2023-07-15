const carrito= [
    {nombre:"Monitor 20 Pulgadas", precio:500},
    {nombre:"TV", precio:100},
    {nombre:"Tablet", precio:200},
    {nombre:"Audifonos", precio:300},
    {nombre:"Teclado", precio:400},
    {nombre:"Celular", precio:700},
    
]

//con un foreach
let resultado='';

carrito.forEach((producto,index)=>{
    if (producto.nombre=='Tablet') {
        resultado=carrito[index];
    }
})
console.log(resultado);


//con un .find retorna el primer elemento
const resultado2 = carrito.find(producto=>producto.nombre=='Tablet');
console.log(resultado2);