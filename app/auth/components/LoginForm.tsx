import React from 'react';

import { Routes } from '@blitzjs/next';
import { useMutation } from '@blitzjs/rpc';
import { AuthenticationError, PromiseReturnType } from 'blitz';
import Link from 'next/link';

import login from 'app/auth/mutations/login';
import { Login } from 'app/auth/validations';
import Card, { CardActions, CardTitle } from 'app/core/components/Card';
import Form, { FORM_ERROR, SubmitHandler } from 'app/core/components/Form';
import FormButton from 'app/core/components/FormButton';
import TextInput from 'app/core/components/TextInput';

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

const LoginForm: React.FC<LoginFormProps> = props => {
  const [loginMutation] = useMutation(login);

  const handleSubmit: SubmitHandler<typeof Login> = async values => {
    try {
      const user = await loginMutation(values);
      props.onSuccess?.(user);
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: 'Sorry, those credentials are invalid' };
      }

      return {
        [FORM_ERROR]: `Sorry, we had an unexpected error. Please try again. - ${error.toString()}`,
      };
    }
  };

  return (
    <div className='flex justify-center mt-20'>
      <Card width='md'>
        <CardTitle>Login</CardTitle>

        <Form schema={Login} onSubmit={handleSubmit}>
          <TextInput name='email' label='Email' />
          <TextInput name='password' label='Password' type='password' />

          <CardActions>
            <FormButton type='submit' variant='primary'>
              Login
            </FormButton>
          </CardActions>
        </Form>

        <div className='flex gap-4 pt-5 justify-center'>
          <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>•
          <Link href={Routes.RegisterPage()}>Register</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
