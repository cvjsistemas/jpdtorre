const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio'];

const carrito= [
    {nombre:"Monitor 20 Pulgadas", precio:500},
    {nombre:"TV", precio:100},
    {nombre:"Tablet", precio:200},
    {nombre:"Audifonos", precio:300},
    {nombre:"Teclado", precio:400},
    {nombre:"Celular", precio:700},
    
]

//comprobar si un valor existe en un arreglo
meses.forEach((mes)=>{
    if (mes=="Enero") {
        console.log('Enero si existe');
    }
})

//includes solo funciona en arreglo de indices
const resultado = meses.includes('Enero');
console.log(resultado);

//en un arreglo de objetos se utiliza .some
const existe = carrito.some((producto)=>{
        return producto.nombre=='Celular';
})
console.log(existe);

//en un arreglo tradicional de indice con .some
const existe2 = meses.some((mes)=>{
    return mes=='Febrero';
})
console.log(existe2);