// if (!self.define) {
//     const e = e => {
//         "require" !== e && (e += ".js");
//         let r = Promise.resolve();
//         return t[e] || (r = new Promise((async r => {
//             if ("document" in self) {
//                 const t = document.createElement("script");
//                 t.src = e, document.head.appendChild(t), t.onload = r
//             } else importScripts(e), r()
//         }))), r.then((() => {
//             if (!t[e]) throw new Error(`Module ${e} didn’t register its module`);
//             return t[e]
//         }))
//     }, r = (r, t) => {
//         Promise.all(r.map(e)).then((e => t(1 === e.length ? e[0] : e)))
//     }, t = {
//         require: Promise.resolve(r)
//     };
//     self.define = (r, s, i) => {
//         t[r] || (t[r] = Promise.resolve().then((() => {
//             let t = {};
//             const o = {
//                 uri: location.origin + r.slice(1)
//             };
//             return Promise.all(s.map((r => {
//                 switch (r) {
//                     case "exports": return t;
//                     case "module": return o;
//                     default: return e(r)
//                 }
//             }))).then((e => { const r = i(...e); return t.default || (t.default = r), t }))
//         })))
//     }
// } define("./sw.js", ["./workbox-9e257e41"], (function (e) {
//     "use strict";
//     self.skipWaiting(), e.clientsClaim(), e.precacheAndRoute([{
//         url: "index.html", revision: "ef8a02db437c74f2ecb0d88becc4b9d4"
//     }], {})
// }));
// //# sourceMappingURL=sw.js.map


const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    '../src/App.css',
    '../src/App.js',
    '../src/index.js',
    '../src/images/BlackBin.jpg',
    '../src/images/BlueBin.jpg',
    '../src/images/BrownBin.jpg',
    '../src/images/GreenBin.jpg'
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
