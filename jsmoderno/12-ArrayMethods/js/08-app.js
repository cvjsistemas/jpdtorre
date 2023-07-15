const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio'];

const carrito= [
    {nombre:"Monitor 20 Pulgadas", precio:500},
    {nombre:"TV", precio:100},
    {nombre:"Tablet", precio:200},
    {nombre:"Audifonos", precio:300},
    {nombre:"Teclado", precio:400},
    {nombre:"Celular", precio:700},
    
]

//sin spread modificando el arreglo original
//meses.push('Agosto');
//console.log(meses);

//con spread no modifica el arreglo original con arreglo de indices
const meses2= [...meses,'Agosto'];
console.log(meses2);

const producto = {nombre :'Disco Duro', precio:300};

const carrito2 = [...carrito, producto];
console.log(carrito2);