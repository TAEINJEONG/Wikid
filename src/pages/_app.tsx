import { SnackbarProvider } from '@/context/SnackbarContext';
import { AuthProvider } from '@/lib/context/authProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </AuthProvider>
  );
}
