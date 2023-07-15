document.addEventListener('DOMContentLoaded', () => {

const contratos = Array.from(document.getElementById('#contrato').options);
const seleccionado = document.querySelector('.consel').textContent;

contratos.forEach(contrato=>{
  
    if(contrato.innerText === seleccionado){
        console.log(contrato.innerText);
        contrato.setAttribute('selected', 'selected');
    }
})


})