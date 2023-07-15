const btnenviar=document.querySelector('.btn__enviar');

const footer = document.querySelector('.footer');

btnenviar.addEventListener('click',()=>{

    if(footer.classList.contains('activo')){
        footer.classList.remove('activo');
    } else{
        footer.classList.add('activo');
    }


    //alert('diste click al boton');
   
});