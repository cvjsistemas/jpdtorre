// Fetch API desde un JSON (Array)

const cargarJSONBtn = document.querySelector('#cargarJSON');
cargarJSONBtn.addEventListener('click', obtenerDatos);


//FORMA LARGA


// function obtenerDatos() {

//      fetch('data/empleado.json') 
//         .then( respuesta => {
//            console.log(respuesta);
//            return respuesta.json();
//         }) 
//         .then(resultado => {
//            mostrarHTML(resultado);
//             console.log(resultado);
//         })

// }





// function mostrarHTML(resultado) {

//     const {empresa, id, nombre, trabajo} = resultado;

//     const contenido = document.querySelector('#contenido');

//     contenido.innerHTML = `
//         <p>Empleado: ${nombre} </p>
//         <p>ID: ${id} </p>
//         <p>Empresa: ${empresa} </p>
//         <p>Trabajo: ${trabajo} </p>
//     `
// }


//FORMA CORTA



function obtenerDatos() {


        fetch('data/empleado.json') 
        .then( respuesta => respuesta.json()) 
        .then(resultado => mostrarHTML(resultado))
        .catch(error => console.log(error));
            //console.log(resultado);)
}





function mostrarHTML({empresa,  id, nombre, trabajo}) {
    const contenido = document.querySelector('#contenido');

    contenido.innerHTML = `
        <p>Empleado: ${nombre} </p>
        <p>ID: ${id} </p>
        <p>Empresa: ${empresa} </p>
        <p>Trabajo: ${trabajo} </p>
    `
}

