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
  env: {
    BASE_URL: process.env.BASE_URL
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: nextSafe({
          isDev,
          contentSecurityPolicy: {
            'base-uri': "'none'",
            'child-src': "'none'",
            'connect-src': "'self'",
            'default-src': "'self'",
            'font-src': "'self'",
            'form-action': "'self'",
            'frame-ancestors': "'none'",
            'frame-src': "'none'",
            'img-src': "'self'",
            'manifest-src': "'self'",
            'object-src': "'none'",
            'prefetch-src': "'self'",
            'script-src': "'self'",
            'style-src': "'self' 'unsafe-inline'",
            'worker-src': "'self'",
            reportOnly: false
          }
        })
      }
    ];
  }
});
