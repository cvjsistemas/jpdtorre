const carrito = new Set();
carrito.add('camisa');
carrito.add('camisa1');
carrito.add('camisa2');

//console.log(carrito.delete('camisa2'));

carrito.forEach( producto=>{
    console.log(producto);
})


console.log(carrito.has('camisa'));
console.log(carrito.size)
console.log(carrito);

//del siguiente arreglo , eliminar los duplicados
const numeros = [10,20,30,40,50,10,20];

const noduplicados = new Set(numeros);

console.log(noduplicados);