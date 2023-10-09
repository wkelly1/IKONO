// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextSafe = require('next-safe');

const isDev = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: nextSafe({
          isDev,
          contentSecurityPolicy: {
            'font-src': "'self' fonts.gstatic.com",
            'style-src': "'self' fonts.googleapis.com",
            'script-src': ["'self'", 'va.vercel-scripts.com'],
            'upgrade-insecure-requests': [],
            'prefetch-src': false
          }
        })
      }
    ];
  }
});
