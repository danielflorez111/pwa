
// Ciclo de vida del SW

self.addEventListener('install', event => {
    // Descargar assets
    // Crear cache
    console.log('Instalando SW');

    const instalacion = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            self.skipWaiting();
            resolve()
        }, 1);
    })

    event.waitUntil(instalacion);
});

self.addEventListener('activate', event => {
    // Borrar cache viejo
    console.log('SW: Activo y listo para controlar la App');
});

self.addEventListener('fetch', event => {
    // console.log('SW:', event.request.url);

    // if (event.request.url.includes('reqres')) {
    //     const resp = new Response(
    //         `{
    //             ok:false,
    //             mensaje:'hola'
    //         }`
    //     );

    //     event.respondWith(resp);
    // }
});

self.addEventListener('sync', event => {
    console.log('Tenemos conexión');
    console.log(event.tag);
});

self.addEventListener('push', event => {
    console.log('Notificación recibida');
});