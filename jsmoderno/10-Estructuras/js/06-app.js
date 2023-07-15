const usuario=true;
const puedepagar= true;

if (usuario && puedepagar) {
    console.log('Si puedes comprar');
} else if(!usuario){
    console.log('Inicia sesion o crea una cuenta');
} else if(!puedepagar){
    console.log('Fondos insuficientes');
} else{
    console.log('No puedes comprar');
}