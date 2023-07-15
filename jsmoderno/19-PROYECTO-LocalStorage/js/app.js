


     //variables
const formulario = document.querySelector('#formulario');
const listatweets = document.querySelector('#lista-tweets');
let tweets = [];

eventListeners();
//event listeners

function eventListeners(){
     formulario.addEventListener('submit', agregarTweet);

     
          document.addEventListener('DOMContentLoaded',()=>{
               tweets = JSON.parse(localStorage.getItem('tweets')) || [];
          })
}


//funciones
function agregarTweet(e){
     e.preventDefault();

     const tweet = document.querySelector('#tweet').value;

     //validacion
     if (tweet===''){
          mostrarError('Un mensaje No puede ir vacio');
          return;
     }

     const tweetobj={
          id: Date.now(),
          tweet: tweet
     }

     //añadir al arreglo de tweets
     tweets = [...tweets, tweetobj];


     //crear html
crearHTML();

//reiniciar el formulario
formulario.reset();
}




function mostrarError(error){
     const mensajeError = document.createElement('p');
     mensajeError.textContent= error;
     mensajeError.classList.add('error');

     const contenido =document.querySelector('#contenido');
     contenido.appendChild(mensajeError);

     setTimeout(()=>{
          mensajeError.remove();
     },3000);

}





function crearHTML(){

     limpiarHTML();

     if(tweets.length>0){
          tweets.forEach((tweet)=>{

               //agregar un boton de eliminar
               const btneliminar = document.createElement('a');
               btneliminar.classList.add('borrar-tweet');
               btneliminar.textContent='x';

               //funcion de eliminar
               btneliminar.onclick = ()=>{
                    borrarTweet(tweet.id);
               }

               const li = document.createElement('li');
               li.innerText = tweet.tweet;
               li.appendChild(btneliminar);

               listatweets.appendChild(li);
          })
     }
     sincronizarStorage();
}

//agrega los tweets actuales a local storage

function sincronizarStorage(){
     localStorage.setItem('tweets',JSON.stringify(tweets));
}


//elimina tweet
function borrarTweet(id){
     tweets = tweets.filter(tweet=> tweet.id !== id);
     crearHTML();

}

//limpiar html
function limpiarHTML(){
     while(listatweets.firstChild){
          listatweets.removeChild(listatweets.firstChild);
     }
}













