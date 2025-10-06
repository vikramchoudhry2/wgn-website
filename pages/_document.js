import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/WeGotNext-logo.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/WeGotNext-logo.png?v=2" />
        <link rel="apple-touch-icon" href="/assets/WeGotNext-logo.png?v=2" />
        <meta name="theme-color" content="#ff6b35" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
