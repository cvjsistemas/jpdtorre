localStorage.setItem('nombre','Juan'); //solo almacena string
//no se puede almacenar objetos ni arreglos

const producto = {
    nombre: 'Monitor 24 pulgadas',
    precio: 300,
}

const productostring =JSON.stringify(producto);
//console.log(productostring);
localStorage.setItem('producto',productostring);

const meses = ["Enero","Febrero","Marzo"];

const mesesString = JSON.stringify(meses);
localStorage.setItem('meses',mesesString);