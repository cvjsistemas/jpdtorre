iniciarApp();
function iniciarApp(){
    console.log('Iniciando app...');
    segundaFuncion();
}

function segundaFuncion(){
    console.log('Desde la segunda funcion');
    usuarioAuntenticado('Pablo');
}

function usuarioAuntenticado(usuario){
    console.log('Auntenticando usuario...espere...');
    console.log(`Usuario autenticado exitosamente ${usuario}`);
}