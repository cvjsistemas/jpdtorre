window.onload = function() {
  //  alert("hola mundo");
  const nombre = prompt('Cual es tu nombre');
  const contenido = document.querySelector('.contenido');

  contenido.innerHTML=`${nombre} esta aprendiendo JS Moderno`;
}