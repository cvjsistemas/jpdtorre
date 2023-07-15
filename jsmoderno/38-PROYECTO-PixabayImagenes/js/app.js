
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const resgistrosporpagina =40;
let totalPaginas;
let iterador;
let paginaActual=1;


// window.onload = () => {
//     const formulario = document.querySelector('#formulario');
//     formulario.addEventListener('submit', validarFormulario);
//     //paginacionDiv.addEventListener('click', direccionPaginacion);
// };

document.addEventListener('DOMContentLoaded',()=>{
    
    formulario.addEventListener('submit', validarFormulario);
    //paginacionDiv.addEventListener('click', direccionPaginacion);
})
  

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === '') {
        // mensaje de error
        mostrarAlerta('Agrega un término de búsqueda');
        return;
    }

    buscarImagenes();


}

function mostrarAlerta(mensaje){

    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        const divalerta = document.createElement('div');
        divalerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center');
        divalerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span> `;
        formulario.appendChild(divalerta);
    
        setTimeout(() => {
            divalerta.remove();
        }, 3000);
    }    
   
  

}

function buscarImagenes(){
    const termino = document.querySelector('#termino').value;
    const key = '1732750-d45b5378879d1e877cd1d35a6';
   // const url = `https://pixabay.com/api/?key=${key}&q=${terminoBusqueda}&per_page=30&page=${resgistrosporpagina}`;
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${resgistrosporpagina}&page=${paginaActual}`;
    //console.log(url);
 

    fetch(url)
    .then(response => response.json())
    .then(resultado => {
        totalPaginas = calcularPaginas(resultado.totalHits);
        mostrarImagenes(resultado.hits);
        //console.log(json);
    })
    .catch(err => console.error(err));
}


function *crearPaginador(total){
    for (let i=1; i<= total; i++){
        yield i;
    }
}


function calcularPaginas(total){
    return parseInt(Math.ceil(total/resgistrosporpagina));
}

function mostrarImagenes(imagenes) {
    //console.log(imagenes);

    limpiarHTML();

   
    imagenes.forEach( imagen => {

        const { likes, views, previewURL, largeImageURL } = imagen;
        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
                <div class="bg-white ">
                    <img class="w-full" src=${previewURL} alt={tags} />
                    <div class="p-4">
                        <p class="card-text">${likes} Me Gusta</p>
                        <p class="card-text">${views} Vistas </p>
        
                        <a class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white"
                        href=${largeImageURL} 
                        rel="noopener noreferrer" 
                        target="_blank" >Ver Imagen</a>
                    </div>
                </div>
            </div>
            `;
    });

    limpiarPaginador();

    imprimirPaginador();
}

function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);
    //console.log(iterador);

    while(true){
        const { value,done } = iterador.next();

        if(done) return;

        const boton = document.createElement('a');
        boton.href='#';
        boton.dataset.pagina=value;
        boton.textContent=value;
        boton.classList.add('siguiente','bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-4','rounded');

        boton.onclick = ()=>{
            paginaActual=value;
            console.log(value);
            buscarImagenes();
        }

        paginacionDiv.appendChild(boton);
    }
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function limpiarPaginador(){
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }
}