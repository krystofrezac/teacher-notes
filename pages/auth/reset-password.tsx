import React from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { Routes, useRouterQuery } from '@blitzjs/next';
import { useMutation } from '@blitzjs/rpc';
import Link from 'next/link';

import resetPassword from 'app/auth/mutations/resetPassword';
import { ResetPassword } from 'app/auth/validations';
import Card, { CardActions, CardTitle } from 'app/core/components/Card';
import Form, { FORM_ERROR } from 'app/core/components/Form';
import FormButton from 'app/core/components/FormButton';
import TextInput from 'app/core/components/TextInput';
import DefaultLayout from 'app/core/layouts/Default';

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  return (
    <div className="flex justify-center mt-20">
      <Card width="md">
        <CardTitle>Set a New Password</CardTitle>

        {isSuccess ? (
          <div>
            <h2 className="font-bold pt-4 pb-2">Password Reset Successfully</h2>
            <p>
              You can now <Link href={Routes.HomePage()}>login</Link>
            </p>
          </div>
        ) : (
          <Form
            schema={ResetPassword}
            initialValues={{
              password: '',
              passwordConfirmation: '',
              token: query.token as string,
            }}
            onSubmit={async (
              values,
            ): Promise<{ [FORM_ERROR]: string } | void> => {
              try {
                await resetPasswordMutation(values);
              } catch (error: any) {
                if (error.name === 'ResetPasswordError') {
                  return {
                    [FORM_ERROR]: error.message,
                  };
                }

                return {
                  [FORM_ERROR]:
                    'Sorry, we had an unexpected error. Please try again.',
                };
              }
            }}
          >
            <TextInput name="password" label="New Password" type="password" />
            <TextInput
              name="passwordConfirmation"
              label="Confirm New Password"
              type="password"
            />

            <CardActions>
              <FormButton type="submit" variant="primary">
                Register
              </FormButton>
            </CardActions>
          </Form>
        )}
      </Card>
    </div>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = '/';
ResetPasswordPage.getLayout = (page): React.ReactElement => (
  <DefaultLayout title="Reset Your Password">{page}</DefaultLayout>
);

export default ResetPasswordPage;
