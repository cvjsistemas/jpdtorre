class Cliente{
    constructor(nombre,saldo){
        this.nombre = nombre;
        this.saldo = saldo;
    }

    mostrarInformacion(){
        return `Cliente : ${this.nombre}, tu saldo es de ${this.saldo}`;
    }

    static bienvenida(){
        return `Bienvenido al cajero`;
    }
}

const juan = new Cliente('Juan',400);
console.log(juan.mostrarInformacion());
console.log(Cliente.bienvenida());
console.log(juan);