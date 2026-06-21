const CACHE_NAME = 'carbon-quiz-v3';
const STATIC_ASSETS = [
  './index.html',
  './css/landing.css',
  './js/landing.js',
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
      // Use Promise.allSettled or catch errors on individual files so one failure doesn't break the whole SW install
      return Promise.all(STATIC_ASSETS.map(url => 
        cache.add(url).catch(err => console.warn('Failed to cache:', url, err))
      ));
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
      fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      }).catch(() => {
        return caches.match(event.request);
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
