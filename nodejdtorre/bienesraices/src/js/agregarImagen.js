

// const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const url = document.querySelector('#imagen').getAttribute('action');

const formulario = document.querySelector('#imagen');
const btnPublicar = document.querySelector('#publicar');


    btnPublicar.addEventListener('click', function(e) {
        e.preventDefault();

        const formData = new FormData(formulario);
        // get the file from a <input type="file"> element
        const fileInput = document.querySelector('input[type="file"]'); 
        const file = fileInput.files[0]; 
        // console.log(file);
        formData.append('imagen',file,file.name);
        const data=formData.get('imagen');
        console.log(data);

        // append the file directly to a FormData

        fetch(url, {
        method: 'POST',
        body: data
        })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));


    });

