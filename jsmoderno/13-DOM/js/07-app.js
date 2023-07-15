const encabezado=document.querySelector('h1');


/*encabezado.style.backgroundColor='red';
encabezado.style.fontFamily='Arial';
encabezado.style.textTransform='uppercase';*/

encabezado.classList.add('nueva-clase','segunda-clase');
encabezado.classList.remove('segunda-clase');
console.log(encabezado);