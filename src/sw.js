const STATIC_URLS = [
    './site.webmanifest',
    './apple-touch-icon.png',
    './favicon-32x32.png',
    './favicon-16x16.png',
    './safari-pinned-tab.svg',
    './android-chrome-192x192.png',
    './android-chrome-512x512.png',
];

const ANOTHER_URLS = [
    './', // Alias for index.html
    './bundle.js',
];

const myCacheName = 'smoking-cache';

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches
            .open(myCacheName)
            .then((cache) => cache.addAll([...STATIC_URLS, ...ANOTHER_URLS]))
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
                    cachesToDelete.map((cacheToDelete) =>
                        caches.delete(cacheToDelete)
                    )
                )
            )
    );
});

self.addEventListener('fetch', (evt) => {
    if (evt.request.url.startsWith(self.location.origin)) {
        evt.respondWith(
            caches
                .match(evt.request)
                .then((response) => response || fetch(evt.request))
        );
        evt.waitUntil(
            caches
                .open(myCacheName)
                .then((cache) =>
                    fetch(evt.request).then((response) =>
                        cache.put(evt.request, response)
                    )
                )
        );
    }
});
