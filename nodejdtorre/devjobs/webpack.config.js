import path from 'path';

export default { 
    mode:'development',
    entry:{
      skills  :'./src/js/skills.js',
      app:'./src/js/app.js',
      tipocontrato:'./src/js/tipocontrato.js',
      alertas:'./src/js/alertas.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve('public/js')
    }
}