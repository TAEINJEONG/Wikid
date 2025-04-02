import Header from '@/components/common/Header';
import { SnackbarProvider } from '@/lib/context/SnackbarContext';
import { AuthProvider } from '@/lib/context/authProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import favicon from '@/assets/images/favicon.png';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href={favicon.src} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthProvider>
        <SnackbarProvider>
          <Header />
          <Component {...pageProps} />
        </SnackbarProvider>
      </AuthProvider>
    </>
  );
}
