import React from 'react';

import Document, { Head, Html, Main, NextScript } from 'next/document';

import { ThemeProvider } from 'app/core/theme';

class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang='en' className='bg-base-200'>
        <Head />
        <body>
          {/* @ts-ignore */}
          <ThemeProvider>
            <Main />
          </ThemeProvider>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
