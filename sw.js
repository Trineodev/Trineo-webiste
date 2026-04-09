const CACHE_NAME = 'trineo-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/img/Official%20logo.png',
  '/img/Anal.png',
  '/img/Co-Founder.png',
  '/img/MD%20and%20Co-Founder.png',
  '/img/Screenshot_2026-04-09_220926-removebg-preview.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Orbitron:wght@400;700&family=Space+Grotesk:wght@300;500&display=swap'
];

// Install: Pre-cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => caches.match('/index.html'));
    })
  );
});
