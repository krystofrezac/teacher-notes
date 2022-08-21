import { ReactElement } from 'react';

import { BlitzPage } from '@blitzjs/auth';

import DefaultLayout from 'app/core/layouts/Default';

const StudentsPage: BlitzPage = () => <>ahoj</>;

StudentsPage.authenticate = true;
StudentsPage.getLayout = (page): ReactElement => (
  <DefaultLayout title='students'>{page}</DefaultLayout>
);
export default StudentsPage;
