import { ReactElement } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { useParam } from '@blitzjs/next';
import { useQuery } from '@blitzjs/rpc';

import Card, { CardTitle } from 'app/core/components/Card';
import DefaultLayout from 'app/core/layouts/Default';
import getLesson from 'app/lessons/queries/getLesson';

const LessonPage: BlitzPage = () => {
  const lessonId = useParam('lessonId', 'number');
  const [lessonData, { isLoading: isLessonLoading }] = useQuery(
    getLesson,
    { id: lessonId ?? -1 },
    { suspense: false },
  );

  return (
    <Card loading={isLessonLoading}>
      <CardTitle>{lessonData?.date.toLocaleDateString()}</CardTitle>
    </Card>
  );
};

LessonPage.getLayout = (page): ReactElement => (
  <DefaultLayout title='Lesson'>{page}</DefaultLayout>
);
export default LessonPage;
