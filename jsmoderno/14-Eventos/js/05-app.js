window.addEventListener('scroll',()=>{
    //console.log('scrolling...');
    //const scrollPX= window.scrollY;
    //console.log(scrollPX);
    const footer =document.querySelector('.footer');
    const ubicacion=footer.getBoundingClientRect();
//console.log(ubicacion);

   if (ubicacion.top <400) {
        console.log('el elemento ya esta visible');
    } else{
        console.log('aun no, da mas scroll');
    }
})