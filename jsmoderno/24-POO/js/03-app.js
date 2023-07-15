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

//herencia
class Empresa extends Cliente{
    constructor(nombre,saldo, telefono,categoria){
        super(nombre,saldo);
        this.telefono = telefono;  
        this.categoria = categoria;
    }

    static bienvenida(){
        return `Bienvenido al cajero de empresa`;
    }
}

const juan = new Cliente('Juan',400);
const empresa = new Empresa('Empresa',500,1232323,'Aprendizaje en linea');
console.log(Empresa.bienvenida());

console.log(empresa);