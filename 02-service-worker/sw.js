self.addEventListener('fetch', event => {
    if (event.request.url.includes('style.css')) {
        let respuesta = new Response(`
        body {
            background-color:red !important;
        }
        `,
            {
                headers: {
                    'Content-Type': 'text/css'
                }
            });
        event.respondWith(respuesta);
    }
});