const link = document.querySelector('a');
link.remove();
//console.log(link);

//Eliminar desde el padre
const navlinks = document.querySelector('.nav__links');
console.log(navlinks.children);

navlinks.removeChild(navlinks.children[2]);

