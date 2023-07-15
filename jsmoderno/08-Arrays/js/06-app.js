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

let resultado;

resultado = [...carrito,producto];

console.table(resultado);

resultado = [...resultado,producto2];

console.table(resultado);

resultado = [producto3,...resultado];

console.table(resultado);


console.log(carrito);