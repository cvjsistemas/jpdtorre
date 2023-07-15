//Class Pattern

class Persona{
    constructor(nombre,email){
        this.nombre = nombre;
        this.email=email;
    }
}

const persona= new Persona('Juan','email@email.com');
console.log(persona);