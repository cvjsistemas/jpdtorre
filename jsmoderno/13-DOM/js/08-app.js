const navegacion = document.querySelector('.nav');

console.log(navegacion);
console.log(navegacion.childNodes);//Los espacios en blanco son consideraos elementos
console.log(navegacion.children[1].children[1].textContent);
navegacion.children[1].children[1].textContent = "Nosotros 2";


//Traversing de Hijo al padre

console.log(navegacion.parentElement);


const link= document.querySelector('.nav__link');
console.log(link);
console.log(link.nextElementSibling);

const ultimolink = document.querySelector('.nav__link:nth-child(5)');
console.log(ultimolink);


const navlink = document.querySelector('.nav__links');
console.log(navlink.firstElementChild);
console.log(navlink.lastElementChild);

