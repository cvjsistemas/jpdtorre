const reproductor={
    reproducir :function(id){
        console.log(`Reproduciendo cancion...${id}`);
    },
    pausar : function(){
        console.log('pausando...');
    },
    crearPlaylist: function(nombre){
        console.log(`Creando la playlist de ${nombre}`);
    },
    reproducirPlaylist: function(nombre){
        console.log(`Reproduciendo la playlist ${nombre}`);
    }
}

reproductor.reproducir(30);
reproductor.pausar();

reproductor.borrar = function(){
    console.log('borrando cancion...');
}
reproductor.borrar();