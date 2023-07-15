export const nombreCliente='Juan';
export const ahorro=200;


export function mostrarinformacion(nombre, ahorro){
    return `Cliente: ${nombre} tiene ${ahorro}€`;
}

export function tienesaldo(ahorro){
    if (ahorro > 0) {
        console.log('si tiene saldo');
    } else {
        console.log('el cliente no tiene saldo');
    }
}

export class Cliente{
    constructor(nombre,ahorro){
        this.nombre= nombre;
        this.ahorro=ahorro;
    }

    mostrarinfo(){
        return `Cliente: ${this.nombre} tiene ${this.ahorro}€`;
    }
}



export default function nuevafuncion(){
    console.log('Este es el export default');
}