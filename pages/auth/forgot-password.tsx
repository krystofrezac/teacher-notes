import React from 'react';

import { BlitzPage } from '@blitzjs/next';
import { useMutation } from '@blitzjs/rpc';

import forgotPassword from 'app/auth/mutations/forgotPassword';
import { ForgotPassword } from 'app/auth/validations';
import Card, { CardActions, CardTitle } from 'app/core/components/Card';
import Form, { FORM_ERROR } from 'app/core/components/Form';
import FormButton from 'app/core/components/FormButton';
import TextInput from 'app/core/components/TextInput';
import DefaultLayout from 'app/core/layouts/Default';

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword);

  return (
    <div className="flex justify-center mt-20">
      <Card width="md">
        <CardTitle>Forgot your password?</CardTitle>

        {isSuccess ? (
          <div>
            <h2 className="font-bold pt-4 pb-2">Request Submitted</h2>
            <p>
              If your email is in our system, you will receive instructions to
              reset your password shortly.
            </p>
          </div>
        ) : (
          <Form
            schema={ForgotPassword}
            initialValues={{ email: '' }}
            onSubmit={async (
              values,
            ): Promise<{ [FORM_ERROR]: string } | void> => {
              try {
                await forgotPasswordMutation(values);
              } catch (error: any) {
                return {
                  [FORM_ERROR]:
                    'Sorry, we had an unexpected error. Please try again.',
                };
              }
            }}
          >
            <TextInput name="email" label="Email" />

            <CardActions>
              <FormButton type="submit" variant="primary">
                Send reset password instructions
              </FormButton>
            </CardActions>
          </Form>
        )}
      </Card>
    </div>
  );
};

ForgotPasswordPage.redirectAuthenticatedTo = '/';
ForgotPasswordPage.getLayout = (page): React.ReactElement => (
  <DefaultLayout title="Forgot Your Password?">{page}</DefaultLayout>
);

export default ForgotPasswordPage;
