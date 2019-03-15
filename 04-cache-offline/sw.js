// const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_INMUTABLE_NAME = 'inmutable-v1';

self.addEventListener('install', e => {

    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js'
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

    // 2. Cache with network fallback
    const respuesta = caches.match(e.request)
        .then(res => {

            if (res) return res;

            return fetch(e.request)
                .then(newResp => {
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            cache.put(e.request, newResp);
                        });

                    return newResp.clone();
                });
        });

    e.respondWith(respuesta);

    // 1. Cache only (todo desde el cache)
    // e.respondWith(caches.match(e.request));
});