self.addEventListener('install', event => {
    console.log('Install Event');
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(resourcesToPrecache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Activate Event');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for: ', event.request.url);
});

const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    'App.css',
    'App.js',
    'index.js',
    'images/BlackBin.jpg',
    'images/BlueBin.jpg',
    'images/BrownBin.jpg',
    'images/GreenBin.jpg'
];
