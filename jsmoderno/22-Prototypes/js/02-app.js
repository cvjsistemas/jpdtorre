function Cliente (nombre,saldo){
    this.nombre = nombre;
    this.saldo= saldo;
}

const juan = new Cliente('Juan',500);


function formatearCliente(cliente){
    const {nombre, saldo} = cliente;
    return `El Cliente ${nombre} tiene un saldro de ${saldo}`;
}

console.log(formatearCliente(juan));