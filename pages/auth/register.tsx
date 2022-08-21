import React from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { Routes } from '@blitzjs/next';
import { useRouter } from 'next/router';

import { RegisterForm } from 'app/auth/components/RegisterForm';
import DefaultLayout from 'app/core/layouts/Default';

const RegisterPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <RegisterForm
      onSuccess={async (): Promise<void> => {
        await router.push(Routes.HomePage());
      }}
    />
  );
};

RegisterPage.redirectAuthenticatedTo = Routes.HomePage();
RegisterPage.getLayout = (page): React.ReactElement => (
  <DefaultLayout title='Register'>{page}</DefaultLayout>
);

export default RegisterPage;
