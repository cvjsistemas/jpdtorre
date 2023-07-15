const dinero=300;
const totalapagar=500;
const tarjeta=true;
const cheque=true;

if (dinero>totalapagar) {
    console.log('si podemos pagar');    
}else if(cheque){
    console.log('si tengo cheque') ;   
} else if(tarjeta){
    console.log('si puedo pagar porque tengo la tarjeta');
} else{
    console.log('fondos insuficientes');
}