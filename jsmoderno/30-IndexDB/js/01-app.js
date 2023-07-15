let DB;

document.addEventListener('DOMContentLoaded',()=>{
 crmDB();


setInterval(()=>{
    crearCliente();

},5000);


function crmDB(){

    //crear bd
    let crmdb = window.indexedDB.open('crm',1);

    //error
    crmdb.onerror = function(e){
        console.log('Hubo un error a la hora de crear la BD');
    }

    //si se crea correctmente
    crmdb.onsuccess = function(e){
        console.log('Base de datos creada');

        DB = crmdb.result;
    }

    //configuracion de la bd
    crmdb.onupgradeneeded = function(e){
        //console.log('Este metodo se ejecuta 1 vez');
        //console.log(e.target.result);
        const db = e.target.result;

        const objectstore = db.createObjectStore('crm',{
            keyPath:'crm',
            autoIncrement:true
        });

        objectstore.createIndex('nombre','nombre',{unique:false});
        objectstore.createIndex('email','email',{unique:true});
        objectstore.createIndex('telefono','telefono',{unique:false});

        console.log('Columnas creadas');
    }



}

function crearCliente(){
    let transaction = DB.transaction(['crm'],'readwrite');

    transaction.oncomplete = function(){
        console.log('transaccion completada');
    }

    transaction.onerror = function(){
        console.log('hubo un error en la transaccion');
    }

    const objectstore = transaction.objectStore('crm');

    const nuevocliente ={
        telefono: 123445,
        nombre : 'juan',
        email:'correo@correo.com'
    }

    const peticion = objectstore.add(nuevocliente);
    console.log(peticion);
}