(function(seleccionadas = []){

    const listado = document.querySelector('.lista-conocimientos');
    const habilidades = document.querySelector('.habilidades').textContent.split(',');

    if(habilidades.length){
        habilidades.forEach(habilidad =>{
            seleccionadas.push(habilidad);
        })
    }

    const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS', 'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress'];

    let html = '';
    skills.forEach(skill => {
        html += `
            <li ${seleccionadas.includes(skill) ? ' class="activo"' : ''}>${skill}</li>
        `;
    });

    // console.log(html);
    // return;


    return listado.innerHTML=html;



})()


