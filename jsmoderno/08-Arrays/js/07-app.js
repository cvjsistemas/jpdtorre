const carrito= [];

//definir producto

const producto = {
    nombre:'Monitor 32 pulgadas',
    precio: 400
}

const producto2 = {
    nombre:'Celular',
    precio: 800
}

const producto3 = {
    nombre:'teclado',
    precio: 50
}

const producto4 = {
    nombre:'celular 2',
    precio: 850
}

carrito.push(producto);
carrito.push(producto2);
carrito.unshift(producto3);
carrito.push(producto4);

console.table(carrito);

//eliminar ultimo elemento de un arreglo...
/*carrito.pop();
console.table(carrito);

//eliminar del inicio de un arreglo...
carrito.shift();
console.table(carrito);*/


carrito.splice(1,1);
console.table(carrito);