import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Hind } from '@next/font/google';

const inter = Hind({ weight: ['300', '400', '500', '600', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className} style={{ height: '100%' }}>
      <Component {...pageProps} />
    </main>
  );
}
