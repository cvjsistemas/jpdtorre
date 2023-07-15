const seleccionarSkills = (seleccionadas = [], opciones) => {
    console.log(opciones);

  

    const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS', 'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress'];

    let html = '';
    skills.forEach(skill => {
        html += `
            <li ${seleccionadas.includes(skill) ? ' class="activo"' : ''}>${skill}</li>
        `;
    });
   console.log(html);
    return;

    return opciones.fn().html = html;
}

const tipoContrato= (seleccionado, opciones) => {
    return opciones.fn(this).replace(
        new RegExp(` value="${seleccionado}"`), '$& selected="selected"'
    )
}

const mostrarAlertas= (errores = {}, alertas ) => {
    const categoria = Object.keys(errores);

    // const alerta = document.querySelector('.alertas');

    let html = '';
    if(categoria.length) {
        errores[categoria].forEach(error => {
            html += `<div class="${categoria} alerta">
                ${error}
            </div>`;
        })
    }
    return alertas.fn().html = html;
    // return alerta.innerHTML = html;
}

export{
    seleccionarSkills,
    tipoContrato,
    mostrarAlertas
}