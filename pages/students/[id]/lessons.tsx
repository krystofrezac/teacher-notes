import { ReactElement } from 'react';

import { BlitzPage, useParam } from '@blitzjs/next';
import { useQuery } from '@blitzjs/rpc';

import DefaultLayout from 'app/core/layouts/Default';
import getLessons from 'app/lessons/queries/getLessons';

const LessonsPage: BlitzPage = () => {
  const id = useParam('id', 'number');
  const [data] = useQuery(
    getLessons,
    { where: { studentId: id } },
    { suspense: false },
  );

  return (
    <>
      ahoj{id}{' '}
      {data?.lessons.map(lesson => (
        <div key={lesson.id}>{lesson.id}</div>
      ))}
    </>
  );
};

LessonsPage.getLayout = (page): ReactElement => (
  <DefaultLayout title="Student's lessons">{page}</DefaultLayout>
);

export default LessonsPage;
