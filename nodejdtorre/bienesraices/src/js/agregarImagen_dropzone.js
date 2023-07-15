import {Dropzone} from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const url = document.querySelector('#imagen').getAttribute('action');

let zone = new Dropzone(".dropzone",{
    url: url,
    method: "post",
    dictDefaultMessage:'Sube tus imagenes aqui',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El Limite es 1 Archivo',
    headers: {
        'CSRF-Token': token
    },
    paramName: 'imagen',
    // init: function() {
    //     const dropzone = this
    //     const btnPublicar = document.querySelector('#publicar')

    //     btnPublicar.addEventListener('click', function() {
    //         alert('hola');
    //         return;
    //         dropzone.processQueue()
    //     })

    //     dropzone.on('queuecomplete', function() {
    //         if(dropzone.getActiveFiles().length == 0) {
    //             window.location.href = '/mis-propiedades'
    //         }
    //     })

    // }
    // previewTemplate: previewTemplate,
    // previewsContainer: "#dropzone-preview",
});

console.log(zone);
zone.on("addedfile",function(){
    //console.log('ola');

    fetch(url, {
        headers: {
            'Accept': 'application/json',
            "Content-Type": undefined,
            'CSRF-Token': token
          },
        method: 'POST',
        body: {
            imagen:zone.paramName
        }
     })
     .then(function(response) {
        if(response.ok) {
            return response.text()
        } else {
            throw "Error en la llamada Ajax";
        }
     
     })
     .then(function(texto) {
        console.log(texto);
     })
     .catch(function(err) {
        console.log(err);
     });
    // const dropzone = this
    // const btnPublicar = document.querySelector('#publicar')

    //     btnPublicar.addEventListener('click', function() {
    //         dropzone.processQueue()
    //     })

    //     dropzone.on('queuecomplete', function() {
    //         if(dropzone.getActiveFiles().length == 0) {
    //             window.location.href = '/mis-propiedades'
    //         }
    //     })
})
// Dropzone.options.imagen ={
//     dictDefaultMessage:'Sube tus imagenes aqui'
// }
