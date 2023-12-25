import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="IKONO icons are a large collection of high quality, hand-crafted SVG icons with an MIT license. They are accompanied by their own Figma plugin and React library."
          />
          <meta name="theme-color" content="#2563EB" />
        </Head>
        <body
          style={{ width: '100vw', overflowX: 'hidden', margin: 0, padding: 0 }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
