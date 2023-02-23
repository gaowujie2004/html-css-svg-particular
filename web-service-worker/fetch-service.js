console.log('我运行了？');

const CACHE_NAME = 'test-hh';

self.addEventListener('fetch', (event) => {
  console.log('fetch: ', event.request);
  console.log('fetch headers: ', event.request.headers.get('__gwj-cache'));
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        console.log('caches 有', response);

        return response;
      }
      console.log('caches 中没有');

      return fetch(event.request).then((response) => {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
