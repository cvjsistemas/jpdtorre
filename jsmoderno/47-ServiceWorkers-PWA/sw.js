self.addEventListener('install',e=>{
    console.log('Instalando el Service Worker');

    console.log(e);
});

//activar el service worker

self.addEventListener('activate',e=>{
    console.log('Service Worker Activado');

    console.log(e);
})

///evento fetch pra descargar archivos

self.addEventListener('fetch',e=>{
    console.log('Fetch...',e);
})