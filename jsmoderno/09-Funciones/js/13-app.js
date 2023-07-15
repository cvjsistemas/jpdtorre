const reproductor={
    cancion:'',
    reproducir :(id)=>console.log(`Reproduciendo cancion...${id}`),
    pausar : ()=>console.log('pausando...'),
    borrar: ()=>console.log('borrando cancion....'),
    crearPlaylist: nombre=>console.log(`Creando la playlist de ${nombre}`),
    reproducirPlaylist: nombre=>console.log(`Reproduciendo la playlist ${nombre}`),

    set nuevaCancion(cancion){
        this.cancion=cancion;
        console.log(`Añadiendo ${cancion}`);
    },
    get obtenerCancion(){
        console.log(`${this.cancion}`);
    }
}

reproductor.nuevaCancion='Enter Sandman';
reproductor.obtenerCancion;


reproductor.reproducir(30);
reproductor.pausar();

/*reproductor.borrar = function(){
    console.log('borrando cancion...');
}*/
reproductor.borrar();