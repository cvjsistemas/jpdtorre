//variables
const carrito=document.querySelector('#carrito');
const contenedorcarrito= document.querySelector('#lista-carrito tbody');
const vaciarcarrito= document.querySelector('#vaciar-carrito');
const listacursos= document.querySelector('#lista-cursos');

let articulosCarrito=[];

cargarEventListeners();

function cargarEventListeners(){
 //agregas un curso cuando le das click "Agregar al carrito "
  listacursos.addEventListener('click',agregarCurso);
//elimina cursos del carrito
  carrito.addEventListener('click',eliminarCurso);

  vaciarcarrito.addEventListener('click',()=>{
     //console.log('vaciando carrito');
     articulosCarrito=[];//reseteamos el arreglo
     limpiarHTML();
  })

}

//funciones
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado=e.target.parentElement.parentElement;
      // console.log(e.target.parentElement.parentElement);   
      leerDatosCurso(cursoSeleccionado);
    }
}

//Eliimar un curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        //console.log(e.target.getAttribute('data-id'));
        const cursoid= e.target.getAttribute('data-id');

        //elimina del arreglo de arcivulos por el data-id
        articulosCarrito = articulosCarrito.filter(curso=>curso.id!==cursoid) //deja todos los demas items menos el que coincide en el arreglo
        //console.log(articulosCarrito);
        carritoHTML();
    }
}

//lee el contenido html y extrae el curso
function leerDatosCurso(curso){
    console.log(curso);

    //crear un objeto con el curso actual
    const infocurso={
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso=>curso.id ===infocurso.id);
    //console.log(existe);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso=>{
            if (curso.id ===infocurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son duplicados
            }
        })
        articulosCarrito = [...cursos];
    } else{
        //agregamos el curso al carrito
    //console.log(infocurso);
    //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito,infocurso];
    }

   // console.log(articulosCarrito);
    carritoHTML();
}

//muestra el carrito de compras en el html
function carritoHTML(){

    //limpiar el HTML
    limpiarHTML();


    articulosCarrito.forEach( (curso)=>{
        const row=document.createElement('tr');

        const {imagen, titulo, precio, cantidad,id} = curso;

        row.innerHTML =`
           <td>
                <img src="${imagen}" width="100"
           </td>
            <td> ${titulo} </td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        
        `;
        //agrega el html del carrito en el tbody
        contenedorcarrito.appendChild(row);
    })
}

function limpiarHTML(){
    //forma lenta
    //contenedorcarrito.innerHTML='';

    while(contenedorcarrito.firstChild){
        contenedorcarrito.removeChild(contenedorcarrito.firstChild);
    }
}