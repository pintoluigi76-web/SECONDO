const CACHE = 'secondo-v4-1';
const ASSETS = [
  '/SECONDO/',
  '/SECONDO/index.html',
  '/SECONDO/manifest.webmanifest',
  '/SECONDO/sw.js',
  '/SECONDO/icons/icon-192.png',
  '/SECONDO/icons/icon-512.png'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match('/SECONDO/index.html'))));
});
