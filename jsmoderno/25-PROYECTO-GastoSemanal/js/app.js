//variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastolistado = document.querySelector('#gastos ul');


//eventos
eventlisteners();

function eventlisteners (){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);

    formulario.addEventListener('submit',agregarGasto);
}


//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos =[...this.gastos,gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce((total,gasto)=>total + gasto.cantidad,0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter((gasto)=>gasto.id !== id);
        this.calcularRestante();
    }
}

class UI{
    insertarpresupuesto(cantidad){
        const { presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimiralerta(mensaje, tipo){
        const divmensaje = document.createElement('div');
        divmensaje.classList.add('text-center','alert');

        if (tipo ==='error') {
         divmensaje.classList.add('alert-danger');   
        } else{
        divmensaje.classList.add('alert-success');   
        }

        //mensaje de error
        divmensaje.textContent=mensaje;

        //insertar en el HTML
        document.querySelector('.primario').insertBefore(divmensaje,formulario);

        //quitar del HTML
        setTimeout(()=>{
            divmensaje.remove();
        },3000);
    }

    agregarGastoListado(gastos){

        this.limpiarHTML();

        gastos.forEach(gasto=>{
            const {cantidad, nombre, id} = gasto;

            //crear un li
            const nuevogasto = document.createElement('li');
            nuevogasto.className='list-group-item d-flex justify-content-between align-items-center';
            nuevogasto.setAttribute('data-id',id);

            //agregar el html del gasto
            nuevogasto.innerHTML =`${nombre} <span class="badge bagde-primary badge-pill">${cantidad}</span> `;


            //boton para borrar
            const btnborrar = document.createElement('button');
            btnborrar.classList.add('btn','btn-danger','borrar-gasto');
            btnborrar.textContent='X';
            btnborrar.onclick = ()=>{
                eliminarGasto(id);
            }

            nuevogasto.appendChild(btnborrar);

            //agregar el html
            gastolistado.appendChild(nuevogasto);
        });
    }

    limpiarHTML(){
        while(gastolistado.firstChild){
            gastolistado.removeChild(gastolistado.firstChild);
        }
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestObj){
        const {presupuesto , restante} =presupuestObj;

        const restantediv =document.querySelector('.restante');

        //comprobar 25%
        if((presupuesto/4)>restante){
            restantediv.classList.remove('alert-success','alert-warning');
            restantediv.classList.add('alert-danger');
        } else if ((presupuesto/2)>restante){
            restantediv.classList.remove('alert-success');
            restantediv.classList.add('alert-warning');
        } else {
            restantediv.classList.remove('alert-danger','alert-warning');
            restantediv.classList.add('alert-success');
        }

        //si el total es 0 o menor
        if(restante<=0){
            ui.imprimiralerta('El presupuesto se ha agotado','error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }




}

const ui = new UI();
let presupuesto;


//funciones
function preguntarPresupuesto(){
    const presupuestousuario = prompt('Cual es tu presupuesto');

    //console.log(presupuestousuario);

    if (presupuestousuario ==='' || presupuestousuario ===null || isNaN(presupuestousuario) || presupuestousuario <=0)  {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestousuario);
    console.log(presupuesto);

    ui.insertarpresupuesto(presupuesto);
}

function agregarGasto(e){
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad =Number(document.querySelector('#cantidad').value);

    //validar
    if (nombre === ''  || cantidad === '' ) { 
            ui.imprimiralerta('Ambos campos son obligatorios','error');
            return;
        } else if (cantidad <=0 || isNaN(cantidad)) {
            ui.imprimiralerta('Cantidad no valida','error');
            return;
        }

        const gasto ={
            nombre: nombre,
            cantidad: cantidad,
            id: Date.now()
        }

        presupuesto.nuevoGasto(gasto);

        //mensaje OK
        ui.imprimiralerta('Gasto agregado correctamente');

        //impirmir los gastos
        const {gastos,restante} = presupuesto;
        ui.agregarGastoListado(gastos);

        ui.actualizarRestante(restante);

        ui.comprobarPresupuesto(presupuesto);

        //reinicia el formulario
        formulario.reset();

        //console.log(gasto);
}

function eliminarGasto(id){
    presupuesto.eliminarGasto(id);

    //eliminar los gastos del html
    const {gastos,restante} = presupuesto;
    ui.agregarGastoListado(gastos);
    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
}