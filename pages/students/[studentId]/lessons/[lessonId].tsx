import { ReactElement } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { useParam } from '@blitzjs/next';
import { useQuery } from '@blitzjs/rpc';
import { PencilIcon } from '@heroicons/react/outline';

import Button from 'app/core/components/Button';
import Card, { CardTitle } from 'app/core/components/Card';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';
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
      <CardTitle>
        <Flex horizontal='space-between' fullWidth>
          {lessonData?.date.toLocaleDateString()}{' '}
          <Button size='xs' square>
            <Icon size='xs'>
              <PencilIcon />
            </Icon>
          </Button>
        </Flex>
      </CardTitle>
      {lessonData?.description}
    </Card>
  );
};

LessonPage.getLayout = (page): ReactElement => (
  <DefaultLayout title='Lesson'>{page}</DefaultLayout>
);
export default LessonPage;
