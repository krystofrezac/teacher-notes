import { BlitzLayout } from '@blitzjs/next';
import Head from 'next/head';

import Navbar from '../components/Navbar';
import Spacer from '../components/Spacer';

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
          <div className='bg-base-200'>
            <Spacer all='1/2' bottom='0'>
              <Navbar />
              {!props.hideContentTitle && (
                <Spacer all='1/2'>
                  <h1 className='text-xl'>{props.title}</h1>
                </Spacer>
              )}
            </Spacer>
          </div>
          <div className='pb-1 bg-gradient-to-b from-gray-200 to-transparent' />
        </div>

        <Spacer all='1' top='0'>
          {props.children}
        </Spacer>
      </div>
    </div>
  );
};

export default DefaultLayout;
