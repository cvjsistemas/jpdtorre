localStorage.removeItem('nombre');

//actualizar un registro

const mesesarray =JSON.parse(localStorage.getItem('meses'));
//console.log(mesesarray);
mesesarray.push('Nuevo mes');
localStorage.setItem('meses',JSON.stringify(mesesarray));


//localStorage.clear();
//elimina todos los items del local storage