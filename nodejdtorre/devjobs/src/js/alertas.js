(function(errores = {}) {

    const alertas = document.querySelector('.alertas');
    const error = document.querySelector('.errores').textContent;

    console.log(error);
    return;

    const categoria = Object.keys(mensajes);
    console.log(categoria);
    return;

    let html = '';
    if(categoria.length) {
        errores[categoria].forEach(error => {
            html += `<div class="${categoria} alerta">
                ${error}
            </div>`;
        })
    }
    return alertas.innerHTML = html;
})()