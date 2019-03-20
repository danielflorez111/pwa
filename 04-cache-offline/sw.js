// const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_DYNAMIC_LIMIT = 50;

function limpiarCache(cacheName, numeroItems) {
    caches.open(cacheName)
        .then(cache => {
            return cache.keys()
                .then(keys => {
                    if (keys.length > numeroItems) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems))
                    }
                });
        });
}

self.addEventListener('install', e => {

    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js',
                '/img/no-img.jpg'
            ]);
        });

    const cacheImutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            return cache.addAll([
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
            ]);
        });

    e.waitUntil(Promise.all([cacheProm, cacheImutable]));
});

self.addEventListener('fetch', e => {

    // 5. Cache and network race
    const respuesta = new Promise((resolve, reject) => {
        let rechazada = false;
        const falloUnaVez = () => {
            if (rechazada) {
                if (/\.(png|jpg)$/i.test(e.request.url)) {
                    resolve(caches.match('/img/no-img.jpg'));
                } else {
                    reject('No se encontró respuesta');
                }
            } else {
                rechazada = true;
            }
        };
        fetch(e.request).then(res => {
            res.ok ? resolve(res) : falloUnaVez();
        }).catch(falloUnaVez);
        caches.match(e.request).then(res => {
            res ? resolve(res) : falloUnaVez();
        }).catch(falloUnaVez);

    });
    e.respondWith(respuesta);




    // 4. Cache with network update
    // if (e.request.url.includes('bootstrap')) {
    //     return e.respondWith(caches.match(e.request));
    // }
    // const respuesta = caches.open(CACHE_STATIC_NAME).then(cache => {
    //     fetch(e.request).then(newRes => {
    //         cache.put(e.request, newRes);
    //     });
    //     return cache.match(e.request);
    // });
    // e.respondWith(respuesta);




    // 3. Network with cache fallback
    // const respuesta = fetch(e.request).then(res => {
    //     if (!res) return caches.match(e.request);
    //     caches.open(CACHE_DYNAMIC_NAME)
    //         .then(cache => {
    //             cache.put(e.request, res);
    //             limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
    //         });
    //     return res.clone();
    // }).catch(err => {
    //     return caches.match(e.request);
    // });
    // e.respondWith(respuesta);




    // 2. Cache with network fallback
    // const respuesta = caches.match(e.request)
    //     .then(res => {
    //         if (res) return res;
    //         return fetch(e.request)
    //             .then(newResp => {
    //                 caches.open(CACHE_DYNAMIC_NAME)
    //                     .then(cache => {
    //                         cache.put(e.request, newResp);
    //                         limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
    //                     });
    //                 return newResp.clone();
    //             });
    //     });
    // e.respondWith(respuesta);




    // 1. Cache only (todo desde el cache)
    // e.respondWith(caches.match(e.request));
});