/*for (let i = 0; i < 10; i++) {
    console.log(`Numero: ${i}`);
    
}*/
/*const pares = [];
const impares =[];
for (let i =0; i<=20;i++){
   if (i%2==0) {
        //console.log(`El numero ${i} es par`);
        pares.push(i);
   } else {
    impares.push(i);
   }

}

console.log(pares);
console.log(impares);*/

const carrito= [
    {nombre:"Monitor 20 Pulgadas", precio:500},
    {nombre:"TV", precio:100},
    {nombre:"Tablet", precio:200},
    {nombre:"Audifonos", precio:300},
    {nombre:"Teclado", precio:400},
    {nombre:"Celular", precio:700},
    
]

for (let i = 0; i < carrito.length; i++) {
    console.log(carrito[i].nombre + carrito[i].precio); 
}