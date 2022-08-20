import { BlitzPage } from '@blitzjs/next';
import Link from 'next/link';

import Button from 'app/core/components/Button';
import Hero, { HeroContent, HeroTitle } from 'app/core/components/Hero';
import DefaultLayout from 'app/core/layouts/Default';

const HomePage: BlitzPage = () => {
  return (
    <Hero className="mt-40">
      <HeroTitle>Still in development</HeroTitle>
      <HeroContent>
        Not everything looks stunning right now, but hopefully it is fully
        functional.
      </HeroContent>
      <Link href="/">
        <Button variant="primary">Try it</Button>
      </Link>
    </Hero>
  );
};

HomePage.suppressFirstRenderFlicker = true;
HomePage.getLayout = (page): JSX.Element => (
  <DefaultLayout title="Home" hideContentTitle>
    {page}
  </DefaultLayout>
);

export default HomePage;
