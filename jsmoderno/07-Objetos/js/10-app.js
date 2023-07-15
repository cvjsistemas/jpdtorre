const producto= {
    nombre:"Monitor 20 Pulgadas",
    precio:300,
    disponible: true

}

const medidas={
    peso:'1kg',
    medida:'1m'
}

const resultado = Object.assign(producto,medidas);
console.log(resultado);

//spread operator o rest operator

const resultado2= {...producto,...medidas};
console.log(resultado2);