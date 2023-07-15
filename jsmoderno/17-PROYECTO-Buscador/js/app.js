//variables
   

   const marca =document.querySelector('#marca');
   const year =document.querySelector('#year');
   const minimo =document.querySelector('#minimo');
   const maximo =document.querySelector('#maximo');
   const puertas =document.querySelector('#puertas');
   const transmision =document.querySelector('#transmision');
   const color =document.querySelector('#color');
   

   const contenedor = document.querySelector('#resultado');
   const max = new Date().getFullYear();
   const min = max-10;

   //console.log(max);
  // console.log(min);

   //creando objeto
   const datosbusqueda = {
   	marca:'',
   	year:'',
   	minimo:'',
   	maximo:'',
   	puertas:'',
   	transmision:'',
   	color:''
   }



document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos);

  //llenar select años
  llenarSelectYear();
});

//even listener select
marca.addEventListener('change',(e) =>{
		//console.log(e.target.value);
	datosbusqueda.marca=e.target.value;
	//console.log(datosbusqueda);
	filtrarAuto();
});

year.addEventListener('change',(e) =>{
		//console.log(e.target.value);
	datosbusqueda.year=parseInt(e.target.value);
		filtrarAuto();
});

minimo.addEventListener('change',(e) =>{
		//console.log(e.target.value);
	datosbusqueda.minimo=e.target.value;
	filtrarAuto();
});

maximo.addEventListener('change',(e) =>{
		//console.log(e.target.value);
	datosbusqueda.maximo=e.target.value;
		filtrarAuto();
});

puertas.addEventListener('change',(e) =>{
		//console.log(e.target.value);
	datosbusqueda.puertas=parseInt(e.target.value);
	filtrarAuto();
});


transmision.addEventListener('change',(e) =>{
		//console.log(e.target.value);
	datosbusqueda.transmision=e.target.value;
	filtrarAuto();
});

color.addEventListener('change',(e) =>{
		//console.log(e.target.value);
	datosbusqueda.color=e.target.value;
	console.log(datosbusqueda);
	filtrarAuto();
});




function mostrarAutos(autos){


    const tableautos = document.querySelector('#tableautos');


let headingtabla=` <thead>
                <tr>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Year</th>
                    <th>Precio</th>
                    <th>Puertas</th>
                    <th>Color</th>
                    <th>Transmision</th>
                </tr>
            </thead>


  `;

  autos.forEach(auto=> {
     
     let fila='<tbody>';
     fila +='<tr>';
     fila +='<td>';
     fila +=auto.marca;
     fila +='</td>';
      fila +='<td>';
     fila +=auto.modelo;
     fila +='</td>';
      fila +='<td>';
     fila +=auto.year;
     fila +='</td>';
      fila +='<td>';
     fila +=auto.precio;
     fila +='</td>';
      fila +='<td>';
     fila +=auto.puertas;
     fila +='</td>';
      fila +='<td>';
     fila +=auto.color;
     fila +='</td>';
      fila +='<td>';
     fila +=auto.transmision;
     fila +='</td>';


     fila +='</tr>';
     fila +='</tbody>';

  headingtabla +=fila;

   	})

  //console.log(headingtabla);
  tableautos.innerHTML=headingtabla;

		/*let table = document.createElement('table');
		let thead = document.createElement('thead');
		let tbody = document.createElement('tbody');

		table.appendChild(thead);
		table.appendChild(tbody);

		// Creating and adding data to first row of the table
			let row_1 = document.createElement('tr');
			let heading_1 = document.createElement('th');
			heading_1.innerHTML = "Marca";
			let heading_2 = document.createElement('th');
			heading_2.innerHTML = "Modelo";
			let heading_3 = document.createElement('th');
			heading_3.innerHTML = "Year";
			let heading_4 = document.createElement('th');
			heading_4.innerHTML = "Precio";
			let heading_5 = document.createElement('th');
			heading_5.innerHTML = "Puertas";
			let heading_6 = document.createElement('th');
			heading_6.innerHTML = "Color";
			let heading_7 = document.createElement('th');
			heading_7.innerHTML = "Transmision";

			row_1.appendChild(heading_1);
			row_1.appendChild(heading_2);
			row_1.appendChild(heading_3);
			row_1.appendChild(heading_4);
			row_1.appendChild(heading_5);
			row_1.appendChild(heading_6);
			row_1.appendChild(heading_7);
			thead.appendChild(row_1);

		contenedor.appendChild(table);*/


        

 /*  autos.forEach(auto=> {

 
   			const autoHTML = document.createElement('p');
   			 autoHTML.innerHTML = `
            <p>${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Transmisión: ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}</p>
        `;
   			contenedor.appendChild(autoHTML);
   			//contenedor.innerHTML(tabla);
   	});*/
}

function limpiarHTML(){
	while(contenedor.firstChild){
		contenedor.removeChild(contenedor.firstChild);
	}
}


function  llenarSelectYear(){
		for (let i = max; i >=min; i--) {
			const opcion = document.createElement('option');
			opcion.value=i;
			opcion.textContent=i;
			year.appendChild(opcion); //agrega cada opcion al select

		}
}

function filtrarAuto(){

	const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);


	if (resultado.length) {
				//console.log(resultado);
			mostrarAutos(resultado);
	} else{
		noResultado();
	}

}

function noResultado(){

	limpiarHTML();

	const noresultado = document.createElement('div');
	noresultado.classList.add('alerta','error');
	noresultado.textContent='No hay resultados. Intenta con otros filtros';
	contenedor.appendChild(noresultado);
	//contenedor.innerHTML=noresultado;
}

function filtrarMarca(auto){
	//console.log(datosbusqueda.marca);
	if(datosbusqueda.marca){
		return auto.marca===datosbusqueda.marca;
	}
	return auto;
}

function filtrarYear(auto){
		if(datosbusqueda.year){
		return auto.year===datosbusqueda.year;
	}
	return auto;
}

function filtrarMinimo(auto){
		if(datosbusqueda.minimo){
		return auto.precio>=datosbusqueda.minimo;
	}
	return auto;
}

function filtrarMaximo(auto){
		if(datosbusqueda.maximo){
		return auto.precio<=datosbusqueda.maximo;
	}
	return auto;
}

function filtrarPuertas(auto){
		if(datosbusqueda.puertas){
		return auto.puertas===datosbusqueda.puertas;
	}
	return auto;
}

function filtrarTransmision(auto){
		if(datosbusqueda.transmision){
		return auto.transmision===datosbusqueda.transmision;
	}
	return auto;
}

function filtrarColor(auto){
		if(datosbusqueda.color){
		return auto.color===datosbusqueda.color;
	}
	return auto;
}

