if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('Service Worker registrado...', res))
        .catch(err => console.log('Service Worker no registrado...', err));
} else {
    console.log('Service Worker no soportado');
}