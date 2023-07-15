const navlinks = document.querySelector('.nav__links');
//console.log(navlinks);

//registrar un evento

navlinks.addEventListener('click',()=>{
    console.log('click en nav');
})

navlinks.addEventListener('mouseout',()=>{
    console.log('saliendo de la navegacion');

    navlinks.style.backgroundColor = 'transparent';
})

navlinks.addEventListener('mouseenter',()=>{
    console.log('entrando en la navegacion');

    navlinks.style.backgroundColor = 'red';
})

