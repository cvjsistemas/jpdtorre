const salida = document.querySelector('#salida');
const microfono = document.querySelector('#microfono');

 microfono.addEventListener('click', ejecutarSpeechAPI);

function ejecutarSpeechAPI() {

    const SpeechRecognition =  webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // start recognition
    recognition.start();


    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        salida.classList.add('mostrar');
        salida.innerHTML = "Escuchando...";
    };
    
    recognition.onspeechend = function() {
        salida.innerHTML = "Se detuvo de ejecutar";
        recognition.stop();
    };
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(e) {

        console.log(e.results);

        let transcript = e.results[0][0].transcript;//lo que dices 
        let confidence = e.results[0][0].confidence;//el codigo de confianza


        const speech = document.createElement('p');
        speech.innerHTML = `Grabado: ${transcript}`;

        const seguridad = document.createElement('p');
        seguridad.innerHTML =  `Seguridad:  ${ parseInt( confidence*100) } %`;

        salida.appendChild(speech);
        salida.appendChild(seguridad);
    };
  

}