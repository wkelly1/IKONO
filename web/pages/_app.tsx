import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Poppins, Archivo_Black } from 'next/font/google';
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
    <>
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
    </>
  );
}

export default MyApp;
