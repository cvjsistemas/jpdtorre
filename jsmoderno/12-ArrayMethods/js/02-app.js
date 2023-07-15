const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio'];

const carrito= [
    {nombre:"Monitor 20 Pulgadas", precio:500},
    {nombre:"TV", precio:100},
    {nombre:"Tablet", precio:200},
    {nombre:"Audifonos", precio:300},
    {nombre:"Teclado", precio:400},
    {nombre:"Celular", precio:700},
    
]

meses.forEach((mes,index)=>{
    if(mes=='Abril'){
        console.log(`Encontrado en el indice ${index}`);
    }
})

//encontrar el indice de Abril en un array tradicional
const indice = meses.findIndex((mes)=>{
    return mes=='Abril';
})
console.log(indice);

/**forma corta */
//const indice2 = meses.findIndex(mes=> mes=='Abril');

//encontrar un indice de un array de objetos...

const indice2 = carrito.findIndex((producto)=>{
    return producto.precio==100;
})

console.log(indice2);