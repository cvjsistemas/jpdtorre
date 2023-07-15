import nuevafuncion, { nombreCliente , ahorro , mostrarinformacion, tienesaldo,Cliente} from './cliente.js' ;
//importar empresa

import {Empresa} from './empresa.js';


console.log(nombreCliente);
console.log(ahorro);

console.log(mostrarinformacion(nombreCliente,ahorro));

tienesaldo(ahorro);

const cliente = new Cliente(nombreCliente,ahorro);
// console.log(cliente);
console.log(cliente.mostrarinfo());



const empresa = new Empresa(nombreCliente,ahorro,'Aprendizaje en linea');
console.log(empresa);

nuevafuncion();


