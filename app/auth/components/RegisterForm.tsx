import React from 'react';

import { Routes } from '@blitzjs/next';
import { useMutation } from '@blitzjs/rpc';
import Link from 'next/link';

import register from 'app/auth/mutations/register';
import { Signup } from 'app/auth/validations';
import Card, { CardActions, CardTitle } from 'app/core/components/Card';
import Form, { FORM_ERROR } from 'app/core/components/Form';
import FormButton from 'app/core/components/FormButton';
import TextInput from 'app/core/components/TextInput';

type RegisterFormProps = {
  onSuccess?: () => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = props => {
  const [registerMutation] = useMutation(register);

  return (
    <div className='flex justify-center mt-20'>
      <Card width='md'>
        <CardTitle>Create an account</CardTitle>

        <Form
          schema={Signup}
          onSubmit={async (values): Promise<Record<string, string> | void> => {
            try {
              await registerMutation(values);
              props.onSuccess?.();
            } catch (error) {
              if (
                error.code === 'P2002' &&
                error.meta?.target?.includes('email')
              ) {
                // This error comes from Prisma
                return { email: 'This email is already being used' };
              }

              return { [FORM_ERROR]: error.toString() };
            }
          }}
        >
          <TextInput name='email' label='Email' />
          <TextInput name='password' label='Password' type='password' />

          <CardActions>
            <FormButton type='submit' variant='primary'>
              Register
            </FormButton>
          </CardActions>
        </Form>

        <div className='flex gap-4 pt-5 justify-center'>
          <Link href={Routes.LoginPage()}>Already have an account?</Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;
