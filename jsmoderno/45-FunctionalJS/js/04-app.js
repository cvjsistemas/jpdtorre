

// Utilizando MAP
const carrito = [
    { nombre: 'Monitor 20 Pulgadas', precio: 500},
    { nombre: 'Televisión 50 Pulgadas', precio: 700},
    { nombre: 'Tablet', precio: 300},
    { nombre: 'Audifonos', precio: 200},
    { nombre: 'Teclado', precio: 50},
    { nombre: 'Celular', precio: 500},
    { nombre: 'Bocinas', precio: 300},
    { nombre: 'Laptop', precio: 800},
];

// const resultado = carrito.map((producto)=>{
//     return `${producto.nombre} - ${producto.precio}`;
// })

// console.log(resultado);

const obtenerNombres = producto => {
    return producto.nombre
} 

const resultado = carrito.map(obtenerNombres);
console.log(resultado);



// Y hay muchos otros ejemplos de programación Funcional, en el sig video veamos otros tips para hacer mejor tu código...