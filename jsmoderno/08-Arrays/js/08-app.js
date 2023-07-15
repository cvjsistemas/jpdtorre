//destructuring con arreglos

const numeros =[10,20,30,40,50];

const [,,third] = numeros;

const [primero,segundo,...tercero] = numeros;

console.log(tercero);