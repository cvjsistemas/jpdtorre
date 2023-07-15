document.addEventListener('DOMContentLoaded',()=>{

    const mail = {
        email:'',
        asunto:'',
        mensaje:''
    }
    //console.log(mail);

    const email= document.querySelector('#email');
    const asunto= document.querySelector('#asunto');
    const mensaje= document.querySelector('#mensaje');
    const formulario=document.querySelector('#formulario');
    const btnsubmit = document.querySelector('#formulario button[type="submit"]');
    const btnreset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const checkcc=document.querySelector('#checkcc');


    //asignar eventos
    email.addEventListener('input',validar);
    asunto.addEventListener('input',validar);
    mensaje.addEventListener('input',validar);

    formulario.addEventListener('submit',enviarEmail);


    btnreset.addEventListener('click',()=>{
        e.preventDefault();
        resetearFormulario();
    });

    checkcc.addEventListener('click',crearInput);

    /*asunto.addEventListener('blur',(e)=>{
        // console.log('sali del input');
         console.log(e.target.value);
     })

     mensaje.addEventListener('blur',(e)=>{
        // console.log('sali del input');
         console.log(e.target.value);
     })*/

     function enviarEmail(e){
        e.preventDefault();

       
        
        //return;

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetearFormulario();

            //crear una alerta
            const alertaExito = document.createElement('p');
            alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent ='Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(()=>{
                alertaExito.remove();
            },3000);

        },3000);


        if(e.target[2].name==='cc'){
            quitarInput();
        }
       
  
       

     }

     function validar(e){
        //console.log(e.target.value);
        if (e.target.value.trim()==='') {
            //console.log('esta vacio');
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
            mail[e.target.name]='';
            comprobarEmail();
            return;
        }

        if(e.target.id==='email' && !validarEmail(e.target.value) ){
            mostrarAlerta('El email no es valido',e.target.parentElement);
            mail[e.target.name]='';
            comprobarEmail();
            return;
        
        }

        if(e.target.id==='cc' && !validarEmail(e.target.value) ){
            mostrarAlerta('El email no es valido',e.target.parentElement);
            mail[e.target.name]='';
            comprobarEmail();
            return;
        
        }

        
        limpiarAlerta(e.target.parentElement);
        //asignar los valores al objeto
        mail[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(mail);
        comprobarEmail();
     }

     function mostrarAlerta(mensaje,referencia){
        //comprueba si ya existe una alerta
        limpiarAlerta(referencia);


        //console.log('hubo un error');
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center');

        referencia.appendChild(error);
     }

     function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
     }

     function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
        //console.log(resultado);
     }

     function comprobarEmail(){
        if (Object.values(mail).includes('')) {
            btnsubmit.classList.add('opacity-50');
            btnsubmit.disabled= true;
            return;
            
        } 
            btnsubmit.classList.remove('opacity-50');
            btnsubmit.disabled= false;

        //console.log(Object.values(mail).includes('')); //transforma a un array;
     }

     function resetearFormulario(){
               
                //reiniciar el objeto
                mail.email='';
                mail.asunto='';
                mail.mensaje='';
                formulario.reset();
                comprobarEmail();
              
     }

     function crearInput(e){
        console.log(e.target.checked);
        const ccrefe = e.target.parentElement; //padre actual
        const copia = document.createElement('input'); //crea el input
     
        if (e.target.checked) {
      
          copia.setAttribute("type", "email");
          copia.name = 'cc';
          copia.id='cc'
          copia.classList.add('border','border-gray-300','px-3','py-2','rounded-lg');
          copia.placeholder='Email CC, ej: mkt@empresa.com'
          ccrefe.appendChild(copia);
          //agregamos al objeto
          mail.cc='';
          console.log(mail);
  
          const cc = ccrefe.querySelector('#cc');
          cc.addEventListener('input',validar);
  
  
        } else{
          const elemento = ccrefe.querySelector('#cc');
          limpiarAlerta(ccrefe);
          elemento.remove();
          delete mail.cc;
          console.log(mail);
        }
     }


     function quitarInput(){
            const dinamico = document.querySelector('#cc');
            if (dinamico) {
                dinamico.remove();
            }
     }
});