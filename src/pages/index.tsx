import Head from 'next/head';
import MemoryBoard from '../components/MemoryBoard';

export default function Home() {
  return (
    <>
      <Head>
        <title>Secret Memory</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <MemoryBoard />
    </>
  );
}
