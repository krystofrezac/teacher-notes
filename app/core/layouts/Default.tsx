import { BlitzLayout } from '@blitzjs/next';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { RouteUrlObject } from 'blitz';
import Head from 'next/head';
import Link from 'next/link';

import Button from '../components/Button';
import Flex from '../components/Flex';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import Spacer from '../components/Spacer';

const DefaultLayout: BlitzLayout<{
  title: string;
  backLink?: { link: RouteUrlObject; text: string };
  hideContentTitle?: boolean;
  children?: React.ReactNode;
  goToAppButton?: boolean;
}> = props => {
  return (
    <>
      <Head>
        <title>{`${props.title} - Teacher notes`}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <div className='sticky top-0 z-20'>
          <div className='bg-base-200'>
            <Spacer all='1/2' bottom='0'>
              <Navbar goToAppButton={props.goToAppButton} />
              {!props.hideContentTitle && (
                <Spacer all='1/2'>
                  <h1 className='text-xl'>{props.title}</h1>
                </Spacer>
              )}
              {props.backLink && (
                <Spacer left='1/2' right='1/2'>
                  <Link href={props.backLink.link}>
                    <Button variant='link' size='xs' noPadding normalCase>
                      <Flex vertical='center' gap='1/4'>
                        <Icon size='xs'>
                          <ChevronLeftIcon />
                        </Icon>
                        {props.backLink.text}
                      </Flex>
                    </Button>
                  </Link>
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
    </>
  );
};

export default DefaultLayout;
