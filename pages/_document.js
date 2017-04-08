/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import serialize from 'serialize-javascript';

export default class CustomDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = (
      <style dangerouslySetInnerHTML={{ __html: styleSheet.rules().map(rule => rule.cssText).join('\n') }} />
    );

    return { ...page, styles };
  }

  render() {
    const cssReset = `
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background-color: #d8c0c0;
      }
    `;

    return (
      <html lang="sv">
        <Head>
          <style>{cssReset}</style>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>Gbg Shorts</title>
          <meta name="description" content="Gbg Shorts list" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__env__ = ${serialize({
              NODE_ENV: process.env.NODE_ENV,
              FIREBASE_KEY: process.env.FIREBASE_KEY,
            }, { isJSON: true })}` }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
