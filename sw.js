importScripts('https://cdn.jsdelivr.net/npm/skx@0.2.3/js/workbox-v5.1.1/workbox-sw.js');
workbox.setConfig({
    modulePathPrefix: 'https://cdn.jsdelivr.net/npm/skx@0.2.3/js/workbox-v5.1.1/'
});
const {
    core,
    precaching,
    routing,
    strategies,
    expiration,
    cacheableResponse,
    backgroundSync
} = workbox;
const {
    CacheFirst,
    NetworkFirst,
    NetworkOnly,
    StaleWhileRevalidate
} = strategies;
const {
    ExpirationPlugin
} = expiration;
const {
    CacheableResponsePlugin
} = cacheableResponse;
const cacheSuffixVersion = '-200324',
    precacheCacheName = core.cacheNames.precache,
    runtimeCacheName = core.cacheNames.runtime,
    maxEntries = 100;
core.setCacheNameDetails({
    prefix: 'MartialBE',
    suffix: cacheSuffixVersion
});
core.skipWaiting();
core.clientsClaim();
precaching.cleanupOutdatedCaches();
precaching.precacheAndRoute([{
    url: 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@12.3.0/dist/lazyload.iife.min.js',
    revision: null
}, {
    url: 'https://cdn.jsdelivr.net/npm/skx@0.1.6/js/cp.js',
    revision: null
}, {
    url: 'https://cdn.jsdelivr.net/npm/skx@0.2.2/js/optical.js',
    revision: null
}, {
    url: 'https://cdn.jsdelivr.net/npm/instant.page@3.0.0/instantpage.min.js',
    revision: null
}, {
    url: 'https://cdn.jsdelivr.net/npm/disqusjs@1.2.6/dist/disqusjs.css',
    revision: null
}, {
    url: 'https://cdn.jsdelivr.net/npm/disqusjs@1.2.5/dist/disqus.js',
    revision: null
}, {
    url: 'https://cdn.jsdelivr.net/combine/npm/spectre.css@0.5.3/dist/spectre.min.css,npm/hexo-theme-suka@1.4.0/source/css/style.min.css',
    revision: null
}], );
routing.registerRoute(/(.*(?:alicdn|360buyimg|joybuy)\.com)|i.loli.net/, new CacheFirst({
    cacheName: 'img-cache' + cacheSuffixVersion,
    fetchOptions: {
        mode: "cors",
        credentials: "omit"
    },
    plugins: [new ExpirationPlugin({
        maxEntries,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true
    }), new CacheableResponsePlugin({
        statuses: [0, 200],
    }), ]
}));
routing.registerRoute(/.*cdn\.jsdelivr\.net/, new CacheFirst({
    cacheName: 'static-immutable' + cacheSuffixVersion,
    fetchOptions: {
        mode: "cors",
        credentials: "omit"
    },
    plugins: [new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true
    }), new CacheableResponsePlugin({
        statuses: [0, 200],
    }), ]
}));
routing.registerRoute(/.*shadow\.elemecdn\.com/, new CacheFirst({
    cacheName: 'static-immutable' + cacheSuffixVersion,
    fetchOptions: {
        mode: "cors",
        credentials: "omit"
    },
    plugins: [new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true
    }), new CacheableResponsePlugin({
        statuses: [0, 200],
    }), ]
}));
routing.registerRoute(/.*unpkg\.zhimg\.com/, new CacheFirst({
    cacheName: 'static-immutable' + cacheSuffixVersion,
    fetchOptions: {
        mode: "cors",
        credentials: "omit"
    },
    plugins: [new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true
    }), new CacheableResponsePlugin({
        statuses: [0, 200],
    }), ]
}));
// routing.registerRoute(new RegExp('^https://dt\.skk\.moe'), new NetworkOnly({
//     plugins: [new backgroundSync.BackgroundSyncPlugin('Optical_Collect_1', {
//         maxRetentionTime: 12 * 60
//     }), ]
// }));
// routing.registerRoute(new RegExp('/optical/(.*)'), new NetworkOnly({
//     plugins: [new backgroundSync.BackgroundSyncPlugin('Optical_Collect_2', {
//         maxRetentionTime: 12 * 60
//     }), ]
// }));
// routing.registerRoute(new RegExp('/disqus/(.*)\.json(.*)'), new NetworkFirst({
//     options: [{
//         networkTimeoutSeconds: 3,
//     }]
// }));
// routing.registerRoute(new RegExp('https://disqus\.skk\.moe'), new NetworkFirst({
//     options: [{
//         networkTimeoutSeconds: 3,
//     }]
// }));
// routing.registerRoute(new RegExp('https://api\.skk\.moe\/disqus\/(.*)'), new NetworkFirst({
//     options: [{
//         networkTimeoutSeconds: 3,
//     }]
// }));
// routing.registerRoute(new RegExp('https://disqus\.diygod\.me'), new NetworkFirst({
//     options: [{
//         networkTimeoutSeconds: 3,
//     }]
// }));
// routing.registerRoute(new RegExp('^https://(.*)disqus\.com'), new NetworkOnly());
// routing.registerRoute(new RegExp('https://friends\.skk\.moe/links.json'), new NetworkFirst({
//     options: [{
//         networkTimeoutSeconds: 3,
//     }]
// }));
// routing.registerRoute(new RegExp('^https://(.*)disquscdn\.com(.*)(png|jpg|jpeg|svg|gif)'), new StaleWhileRevalidate({
//     cacheName: 'disqus-img-cache' + cacheSuffixVersion,
//     plugins: [new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 5 * 24 * 60 * 60,
//         purgeOnQuotaError: true
//     }), ],
// }));
// routing.registerRoute(new RegExp('^https://(.*)disquscdn\.com'), new StaleWhileRevalidate({
//     cacheName: 'disqus-cdn-cache' + cacheSuffixVersion,
//     plugins: [new ExpirationPlugin({
//         maxEntries: 10,
//         purgeOnQuotaError: true
//     }), ],
// }));
routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, new StaleWhileRevalidate({
    cacheName: 'img-cache' + cacheSuffixVersion,
    plugins: [new ExpirationPlugin({
        maxEntries: 20,
        purgeOnQuotaError: true
    }), ],
}));
routing.registerRoute(/.*\.(css|js)/, new StaleWhileRevalidate({
    cacheName: 'static-assets-cache',
    plugins: [new ExpirationPlugin({
        maxEntries,
        maxAgeSeconds: 7 * 24 * 60 * 60,
        purgeOnQuotaError: true
    }), ],
}));
routing.registerRoute('/sw.js', new StaleWhileRevalidate());
routing.setDefaultHandler(new NetworkFirst({
    options: [{
        networkTimeoutSeconds: 3,
    }]
}));