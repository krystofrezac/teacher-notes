import { BlitzLayout } from '@blitzjs/next';
import Head from 'next/head';

import Navbar from '../components/Navbar';

const DefaultLayout: BlitzLayout<{
  title: string;
  hideContentTitle?: boolean;
  children?: React.ReactNode;
}> = props => {
  return (
    <div className=''>
      <Head>
        <title>{`${props.title} - Flashcards`}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <div className='sticky top-0 z-20'>
          <div className='bg-base-200 p-2 pb-0'>
            <Navbar />
            {!props.hideContentTitle && (
              <h1 className='p-2 text-xl'>{props.title}</h1>
            )}
          </div>
          <div className='pb-1 bg-gradient-to-b from-gray-200 to-transparent' />
        </div>

        <div className='p-4 pt-0'>{props.children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
