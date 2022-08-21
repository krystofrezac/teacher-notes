import React from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { useRouter } from 'next/router';

import LoginForm from 'app/auth/components/LoginForm';
import DefaultLayout from 'app/core/layouts/Default';

const LoginPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <LoginForm
      onSuccess={async (_user): Promise<void> => {
        const next = router.query.next
          ? decodeURIComponent(router.query.next as string)
          : '/';
        await router.push(next);
      }}
    />
  );
};

LoginPage.redirectAuthenticatedTo = '/';
LoginPage.getLayout = (page): React.ReactElement => (
  <DefaultLayout title='Log In'>{page}</DefaultLayout>
);

export default LoginPage;
