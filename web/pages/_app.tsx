import '../styles/globals.css';
import Version from '../version.json';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { Poppins, Archivo_Black } from 'next/font/google';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const archivo_black = Archivo_Black({
  subsets: ['latin'],
  weight: ['400']
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>IKONO</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="og:url" content="https://ikono.will-kelly.co.uk" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IKONO" />
        <meta
          property="og:description"
          content="IKONO icons are a large collection of high quality, hand-crafted SVG icons with an MIT license. They are accompanied by their own Figma plugin and React library."
        />
        <meta property="og:title" content="IKONO Icons" />
        <meta
          property="og:image"
          content={`${process.env.BASE_URL}/api/og?icon=${
            pageProps.selectedParam
          }&variant=${pageProps.variant}&size=${[
            pageProps.sizeParam
          ]}&version=${Version.version}&similar_count=6`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@WillKelly__" />
        <meta name="twitter:title" content="IKONO Icons" />
        <meta name="twitter:text:title" content="IKONO" />
        <meta
          name="twitter:description"
          content="Free SVG icon pack with MIT license"
        />
        <meta name="twitter:app:name:iphone" content="IKONO" />
        <meta name="twitter:app:name:ipad" content="IKONO" />
        <meta name="twitter:app:name:googleplay" content="IKONO" />
        <meta
          name="twitter:image"
          content="https://ikono.will-kelly.co.uk/banner.png"
        />

        <link
          rel="apple-touch-icon"
          href="/app_icons/apple-touch-icon-180x180.png"
          sizes="180x180"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="IKONO icons are a large collection of high quality, hand-crafted SVG icons with an MIT license. They are accompanied by their own Figma plugin and React library."
        />
        <meta name="theme-color" content="#2563EB" />
      </Head>
      <style jsx global>
        {`
          :root {
            --font-poppins: ${poppins.style.fontFamily};
            --font-archivo: ${archivo_black.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;
