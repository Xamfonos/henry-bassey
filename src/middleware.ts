import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
    // Check if the request is an OAuth login or callback for Keystatic
    if (
        context.url.pathname.startsWith('/api/keystatic/github/oauth') ||
        context.url.pathname.startsWith('/api/keystatic') ||
        context.url.pathname.startsWith('/keystatic')
    ) {
        const forwardedHost = context.request.headers.get('x-forwarded-host');
        const forwardedProto = context.request.headers.get('x-forwarded-proto') || 'https';

        // If we are behind a proxy (like Vercel), rewrite the URL so Keystatic sees the correct public domain
        if (forwardedHost) {
            const newUrl = new URL(context.request.url);
            newUrl.host = forwardedHost;
            newUrl.protocol = `${forwardedProto}:`;
            newUrl.port = '';

            const req = new Request(newUrl.toString(), context.request);

            Object.defineProperty(context, 'request', {
                get: () => req
            });
            Object.defineProperty(context, 'url', {
                get: () => newUrl
            });
        }
    }

    return next();
});
