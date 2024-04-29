const cacheCRM = 'v1';
const files = [
    '/',
    '/index.html',
    '/editar-cliente.html',
    '/nuevo-cliente.html',
    '/404.html',
    'css/tailwind.min.css',
    'js/app.js',
    'js/API.js',
    'js/functions.js',
    'js/newClient.js',
    'js/editClient.js',
    '/db.json'
];

// Cuando se instala el service worker
self.addEventListener('install', e => {
    console.log('SW instalado');

    // Listo todos los archivos para cachear
    e.waitUntil(
        caches.open(cacheCRM)
            .then(cache => {
                console.log('Cacheando');
                cache.addAll(files);
            })
    )
})


// Cuando se activa el service worker
self.addEventListener('activate', e => {
    console.log('SW activado');

    // Elimina los caches antiguos
    e.waitUntil(
        caches.keys()
            .then(keys => {
                // Filtro los cacheces y le digo que tome el q sea igual a cacheCRM
                return Promise.all(keys
                    .filter(key => key !== cacheCRM)
                    .map(key => caches.delete(key))
                )
            })
    )

    // Activa el SW
    self.clients.claim();
})


// Cuando se hace fetch
self.addEventListener('fetch', e => {
    console.log(e.request.url);

    // le digo que levanet los archivos del cache
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res;
                }
                return fetch(e.request);
            })
            .catch(() => caches.match('/404.html'))
    )
})