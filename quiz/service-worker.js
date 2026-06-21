const CACHE_NAME = 'carbon-quiz-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/quiz.js',
  './js/ui.js',
  './data/questions.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('questions.json') || event.request.url.includes('/images/')) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const clonedResponse = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return response;
      }).catch(() => {
        return caches.match(event.request);
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
           return caches.open(CACHE_NAME).then(cache => {
             cache.put(event.request, fetchResponse.clone());
             return fetchResponse;
           });
        });
      }).catch(() => {
        // Ignore fallback for now
      })
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_IMAGES') {
    const urlsToCache = event.data.urls;
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      })
    );
  }
});
