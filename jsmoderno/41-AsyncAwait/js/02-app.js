// Async Await 

function descargarClientes() {
    return new Promise((resolve, reject) => {
        const error = false;

        setTimeout( () => {
            if(!error) {
                resolve('El Listado de Clientes se descargo correctamente'); 
            } else {
                reject('No se pudo aplicar el descuento');
                
            }            
        }, 3000);

    });
}

// Async await
async function ejecutar(){
    try {
        const respuesta= await descargarClientes();
        console.log(respuesta);
    } catch (error) {
        console.log(error);
    }
}
ejecutar();

console.log( 2 + 2); // Este código se continua ejecutando mientras que el await sigue esperando por su respuesta