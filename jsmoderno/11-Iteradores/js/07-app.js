const pendientes = ['tarea','comer','proyecto','estudiar js'];

const carrito= [
    {nombre:"Monitor 20 Pulgadas", precio:500},
    {nombre:"TV", precio:100},
    {nombre:"Tablet", precio:200},
    {nombre:"Audifonos", precio:300},
    {nombre:"Teclado", precio:400},
    {nombre:"Celular", precio:700},
    
]


for (let pendiente of pendientes) {
    console.log(pendiente);    
}

for (let producto of carrito) {
    console.log(producto.nombre);
}