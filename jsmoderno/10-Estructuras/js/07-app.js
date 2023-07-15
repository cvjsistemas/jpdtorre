const efectivo = 300;
const credito=400;
const disponible= efectivo + credito;
const totalapagar=600;

if (efectivo > totalapagar || credito > totalapagar || disponible > totalapagar) {
    console.log('Si podemos pagar');
} else{
    console.log('Fondos insifucientes');
}