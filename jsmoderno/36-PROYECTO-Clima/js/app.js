
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// window.addEventListener('load', () => {
//     formulario.addEventListener('submit', buscarClima);
// })

document.addEventListener('DOMContentLoaded', () => {
  formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e) {
  e.preventDefault();
  
  const ciudad =document.querySelector('#ciudad').value;
  const pais =document.querySelector('#pais').value;

  if (ciudad==='' || pais ==='') {
    mostrarError('Ambos campos son obligatorios');
    return;
  }

  //consultar API
  consultarAPI(ciudad, pais);

}


function mostrarError(mensaje){
  //console.log(mensaje);
  const alerta = document.querySelector('.bg-red-100');

  if (!alerta) {
        //crear una alerta
  const diverror = document.createElement('div');
  diverror.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center');
  diverror.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${mensaje}</span>
  `;
  container.appendChild(diverror);

    setTimeout(()=>{
      diverror.remove();
    },2000)
  }




}


function consultarAPI(ciudad, pais){


  const appId = '17bdfd686b35102b8c6c80099f48abcd';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  Spinner(); //muestra el spinner

  fetch(url)
    .then(response => response.json())
    .then(datos=>{
      limpiarHTML();
      console.log(datos);
      if (datos.cod ==='404') {
        
        mostrarError('Ciudad no encontrada');
        return;
      }
      //imprime la respuesta en el HTML
       mostrarClima(datos);

    })
    .catch(err => console.error(err))


}

function mostrarClima(datos){
  const { name,main : { temp,temp_max,temp_min}} = datos;

  // const centigrados = temp -273.15;
  // //console.log(centigrados);
  // const grados =parseFloat(centigrados.toFixed(2));

  const centigrados = kelvinACentigrados(temp);
  const max =kelvinACentigrados(temp_max);
  const min =kelvinACentigrados(temp_min);

  const nombreciudad = document.createElement('p');
  nombreciudad.textContent = `Clima en ${name}`;
  nombreciudad.classList.add('font-bold','text-2xl');


  const actual = document.createElement('p');
  actual.innerHTML = `${centigrados}  &#8451;`;
  actual.classList.add('font-bold','text-6xl');

  const tempmaxima = document.createElement('p');
  tempmaxima.innerHTML = `Max: ${max}  &#8451;`;
  tempmaxima.classList.add('text-xl');

  const tempminima = document.createElement('p');
  tempminima.innerHTML = `Min: ${min}  &#8451;`;
  tempminima.classList.add('text-xl');
 
  const resultadodiv =document.createElement('div');
  resultadodiv.classList.add('text-center','text-white');
  resultadodiv.appendChild(nombreciudad);
  resultadodiv.appendChild(actual);
  resultadodiv.appendChild(tempmaxima);
  resultadodiv.appendChild(tempminima);

  resultado.appendChild(resultadodiv);
}

function kelvinACentigrados(grados){
  // return parseFloat(grados.toFixed(2));
  return parseInt(grados-273.15);
}

//const kelvinACentigrados = (grados)=>parseInt(grados-273.15);



function limpiarHTML(){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
}


function Spinner(){
  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
  resultado.appendChild(divSpinner);
}
