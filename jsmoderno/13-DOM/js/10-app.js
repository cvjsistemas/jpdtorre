const enlace = document.createElement('a');

//agregandole el texto
enlace.textContent='Nuevo enlace';

//agregandole href
enlace.href='#';
enlace.target="__blank";

enlace.setAttribute('data-enlace','nuevo-enlace');
enlace.classList.add('alguna-clase');

console.log(enlace);

//seleccionar navegacion

const navlinks= document.querySelector('.nav__links');
//navlinks.appendChild(enlace); //agrega al final
navlinks.insertBefore(enlace,navlinks.children[1]);
//agrega antes del elemento indicado
//console.log(navlinks);