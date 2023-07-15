
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

// Formulario nuevas citas
const formulario = document.querySelector('#nueva-cita');
//formulario.addEventListener('submit', nuevaCita);

let editando;

class Citas{
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas,cita];

        console.log(this.citas);
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id != id);
    }

    editarCita(citaActualizada){
        this.citas =this.citas.map(cita=> cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){

        const divmensaje = document.createElement('div');
        divmensaje.classList.add('text-center','alert','d-block','col-12');

        if(tipo === 'error'){
            divmensaje.classList.add('alert-danger');
        } else {
            divmensaje.classList.add('alert-sucess');
        }

        //mensaje de error
        divmensaje.textContent= mensaje;

        //agregar al DOM
        document.querySelector('#contenido').insertBefore(divmensaje,document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divmensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}){

        this.limpiarHTML();
        //console.log(citas);
        citas.forEach((cita)=>{
                //extraer informacion del objeto de cita
             const {mascota,propietario,telefono, fecha,hora, sintomas,id} = cita;

             const divCita = document.createElement('div');
             divCita.classList.add('cita','p-3');
            // divcita.setAttribute('data-id',id);
            divCita.dataset.id = id;

            
               // scRIPTING DE LOS ELEMENTOS...
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.innerHTML = `${mascota}`;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

             // Agregar un botón de eliminar...
             const btnEliminar = document.createElement('button');
             btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
             btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
             btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

               // Añade un botón de editar...
            const btnEditar = document.createElement('button');
            btnEditar.onclick = () => cargarEdicion(cita);
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
           
            // Agregar al div cita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar);

            //agregar al HTML
            contenedorCitas.appendChild(divCita);

        })
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();
const administrarcitas = new Citas();


// Eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas: ''
}


function datosCita(e) {
    //  console.log(e.target.name) // Obtener el Input
     citaObj[e.target.name] = e.target.value;
     console.log(citaObj)
}


function nuevaCita(e){
    e.preventDefault();

    //extraer informacion del objeto de cita
    const {mascota,propietario,telefono, fecha,hora, sintomas} = citaObj;

    //validar
    if (mascota ==='' || propietario ==='' || telefono ==='' || fecha ==='' || hora ==='' || sintomas ==='') {
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');
       
        //pasar el objeto de la cita a edicion
        administrarcitas.editarCita({...citaObj});

        formulario.querySelector('button[type="submit"]').textContent ='Crear Cita';

        editando= false;

    } else{
            //generar un id 
            citaObj.id = Date.now();

            //creando una nueva cita
            administrarcitas.agregarCita({...citaObj});

            //Mensaje de agregado correctamente
            ui.imprimirAlerta('Se agregó correctamente');
    }

    //reiniciarObjeto
    reiniciarObjeto();


    //resetear formulario
    formulario.reset();

    //mostrar html de citas
    ui.imprimirCitas(administrarcitas);

}


function reiniciarObjeto(){
    citaObj.mascota='';
    citaObj.propietario='';
    citaObj.telefono='';
    citaObj.fecha='';
    citaObj.hora='';
    citaObj.sintomas='';
}

function eliminarCita(id){
    //Eliminar la cita
    administrarcitas.eliminarCita(id);

    //muestre un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //refrescar la cita
    ui.imprimirCitas(administrarcitas);
}

function cargarEdicion(cita){
     //extraer informacion del objeto de cita
     const {mascota,propietario,telefono, fecha,hora, sintomas ,id} = cita;

     //llenar los inputs
     mascotaInput.value = mascota;
     propietarioInput.value = propietario;
     telefonoInput.value = telefono;
     fechaInput.value = fecha;
     horaInput.value = hora;
     sintomasInput.value = sintomas;

     //llenar el objeto
     citaObj.mascota=mascota;
     citaObj.propietario=propietario;
     citaObj.telefono=telefono;
     citaObj.fecha=fecha;
     citaObj.hora=hora;
     citaObj.sintomas=sintomas;
     citaObj.id=id;

     //Cambiar el texto del boton
     formulario.querySelector('button[type="submit"]').textContent ='Guardar Cambios';
     editando= true;
}
