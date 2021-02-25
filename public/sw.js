const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    '../src/App.css',
    '../src/App.js',
    '../src/index.js',
    '../src/pages.js',
    '../src/BinData/testData.json',
    '../src/BinData/addresses.json',
    '../src/images/BlackBin.jpg',
    '../src/images/BlueBin.jpg',
    '../src/images/BrownBin.jpg',
    '../src/images/GreenBin.jpg',
    '../src/images/MCCLogo.PNG',
    '../src/images/settings.png'
];

self.addEventListener('install', event => {
    console.log('Install Event');
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log(cacheName);
            return cache.addAll(resourcesToPrecache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Activate Event');
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
    .then(cachedRepsonse => {
        return cachedRepsonse || fetch(event.request)
    }))
});
