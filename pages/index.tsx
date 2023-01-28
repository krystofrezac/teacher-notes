import { BlitzPage, Routes } from '@blitzjs/next';
import Link from 'next/link';

import Button from 'app/core/components/Button';
import Flex from 'app/core/components/Flex';
import Hero, { HeroContent, HeroTitle } from 'app/core/components/Hero';
import DefaultLayout from 'app/core/layouts/Default';

const HomePage: BlitzPage = () => {
  return (
    <Hero className='mt-40'>
      <HeroTitle>Welcome!</HeroTitle>
      <HeroContent>
        <Flex direction='row' horizontal='center'>
          <Link href={Routes.StudentsPage()}>
            <Button variant='primary'>Try it</Button>
          </Link>
        </Flex>
      </HeroContent>
    </Hero>
  );
};

HomePage.suppressFirstRenderFlicker = true;
HomePage.getLayout = (page): JSX.Element => (
  <DefaultLayout title='Home' hideContentTitle goToAppButton>
    {page}
  </DefaultLayout>
);

export default HomePage;
