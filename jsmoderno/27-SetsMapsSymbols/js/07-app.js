function *creargenerador(){
    yield 1;
    yield 'Juan';
    yield 3+3;
    yield true;
}

/*const iterador = creargenerador();
console.log(iterador);

console.log(iterador.next().value);
console.log(iterador.next().done);
console.log(iterador.next().value);*/


function *generadorcarrito(carrito){
    for (let i = 0; i < carrito.length; i++) {
         yield carrito[i];
        
    }

}

const carrito = ['Producto 1', 'Producto 2','Producto 3'];
const iterador = generadorcarrito(carrito);
console.log(iterador.next());
