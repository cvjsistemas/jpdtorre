const aplicarDescuento = new Promise((resolve,reject)=>{

	const descuento =true;

	if (descuento) {
		resolve('descuento aplicado');
	} else {
		reject('No se pudo aplicar el descuento');
	}
})

aplicarDescuento
.then((resultado)=>console.log(resultado))
.catch((error)=>console.log(error))

//3 valores posibles
//fullfiled
//rejected
//pending