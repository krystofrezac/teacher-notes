import { ReactElement } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { useParam } from '@blitzjs/next';

import DefaultLayout from 'app/core/layouts/Default';

const LessonPage: BlitzPage = () => {
  const lessonId = useParam('lessonId', 'number');

  return <>ahoj {lessonId}</>;
};

LessonPage.getLayout = (page): ReactElement => (
  <DefaultLayout title='Lesson'>{page}</DefaultLayout>
);
export default LessonPage;
