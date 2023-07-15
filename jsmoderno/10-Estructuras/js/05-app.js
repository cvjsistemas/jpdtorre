const metodopago ='cheque';

switch (metodopago) {
    case 'efectivo':
         console.log(`Pagaste con ${metodopago}`);
        break;
    case 'cheque':
        console.log(`Pagaste con ${metodopago}`);
        break;
    case 'tarjeta':
            console.log(`Pagaste con ${metodopago}`);
        break;    
    default:
        console.log('aun no has seleccionado un metodo de pago');
        break;
}