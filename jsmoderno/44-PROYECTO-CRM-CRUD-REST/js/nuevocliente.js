import { mostrarAlerta } from './funciones.js';
import {nuevoCliente} from './API.js';

(function(){
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);

    function validarCliente(e){
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        const cliente ={
            nombre: nombre,
            email:email,
            telefono:telefono,
            empresa:empresa
        }

       // console.log(!Object.values(cliente).every(input=>input !==''));
      
        if (validar(cliente)) {
            //console.log('todos los campos son obligatorios');
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }
        //console.log('Si se paso la validacion');

        nuevoCliente(cliente);
    
    }

    function validar(obj){
        return !Object.values(obj).every(input=>input !=='');
    }
})();