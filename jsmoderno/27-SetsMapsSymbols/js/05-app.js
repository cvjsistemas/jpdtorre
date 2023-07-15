const sym = Symbol();
const sym2 = Symbol();

const nombre = Symbol();
const apellido = Symbol();
const persona = {};

persona[nombre]='Juan';
persona[apellido]='Perez';
persona.tipoCliente = 'Premmium';
persona.saldo =500;

console.log(persona);

//definir una descripcion del symbol

const nombrecliente = Symbol('Nombre del cliente');
const cliente = {};

cliente[nombrecliente] = 'Pedro';
console.log(cliente);