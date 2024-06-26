const CACHE_NAME = 'hangman-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/main.js',
  '/service-worker.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add other assets you want to cache
];

// Install the service worker and cache the necessary files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate the service worker and remove old caches if any
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch the resources from the cache or network if not available in the cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
