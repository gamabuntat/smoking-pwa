const PRECACHE_URLS = [
    './', // Alias for index.html
    './styles.css',
    './reg.js',
    './main.mjs',
    './cigarettes.mjs',
    './utils/eventEmitter.mjs',
    './utils/pipe.mjs',
    './utils/cx.mjs',
    './localStorage.mjs',
    './site.webmanifest',
    './apple-touch-icon.png',
    './favicon-32x32.png',
    './favicon-16x16.png',
    './safari-pinned-tab.svg',
    './android-chrome-192x192.png',
    './android-chrome-512x512.png',
];

const myCacheName = 'v1';

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches
            .open(myCacheName)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                cacheNames.filter((cacheName) => cacheName !== myCacheName)
            )
            .then((cachesToDelete) =>
                Promise.all(
                    cachesToDelete.map((cacheToDelete) => {
                        return caches.delete(cacheToDelete);
                    })
                )
            )
            .then(() => clients.claim())
    );
});

self.addEventListener('fetch', (evt) => {
    if (evt.request.url.startsWith(self.location.origin)) {
        evt.respondWith(
            caches.match(evt.request).then((response) => {
                return (
                    response ||
                    fetch(evt.request).then((resp) => {
                        return caches.open('v1').then((cache) => {
                            cache.put(evt.request, resp.clone());
                            return resp;
                        });
                    })
                );
            })
        );
    }
});
