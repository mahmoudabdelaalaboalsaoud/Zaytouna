// خدمة بسيطة تجعل الموقع قابلاً للتثبيت. لا تخزّن صفحات، فالتحديثات تظهر فوراً.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<h1 dir="rtl" style="font-family:sans-serif;text-align:center;margin-top:30vh">لا يوجد اتصال بالإنترنت</h1>',
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
