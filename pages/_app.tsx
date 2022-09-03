import React from 'react';

import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
} from '@blitzjs/next';
import { AuthenticationError, AuthorizationError } from 'blitz';

import { withBlitz } from 'app/blitz-client';

import 'app/core/styles/index.css';

const RootErrorFallback = ({
  error,
}: ErrorFallbackProps): React.ReactElement => {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>;
  }
  if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title='Sorry, you are not authorized to access this'
      />
    );
  }

  return (
    <ErrorComponent
      statusCode={error?.statusCode || 400}
      title={error.message || error.name}
    />
  );
};

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const getLayout = Component.getLayout || ((page): JSX.Element => page);

  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  );
};

export default withBlitz(MyApp);
