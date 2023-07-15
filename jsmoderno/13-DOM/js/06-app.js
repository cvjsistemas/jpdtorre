const encabezado=document.querySelector('.hero__title');
console.log(encabezado);


console.log(encabezado.innerText); //solo encuentra elementos visibles
console.log(encabezado.textContent);//encuenta elementos asi no estan visibles
console.log(encabezado.innerHTML);

document.querySelector('.hero__title').textContent='nuevo texto';