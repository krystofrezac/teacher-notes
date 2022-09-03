import { ReactElement, useState } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { useParam } from '@blitzjs/next';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { PencilIcon } from '@heroicons/react/outline';

import Button from 'app/core/components/Button';
import Card, { CardTitle } from 'app/core/components/Card';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';
import DefaultLayout from 'app/core/layouts/Default';
import LessonForm from 'app/lessons/components/LessonForm';
import { LessonFormSubmitHandler } from 'app/lessons/components/LessonForm.types';
import updateLesson from 'app/lessons/mutations/updateLesson';
import getLesson from 'app/lessons/queries/getLesson';

const LessonPage: BlitzPage = () => {
  const lessonId = useParam('lessonId', 'number');
  const [state, setState] = useState({ editing: false });
  const [
    lessonData,
    { isLoading: isLessonLoading, refetch: refetchLessonData },
  ] = useQuery(getLesson, { id: lessonId ?? -1 }, { suspense: false });
  const [updateLessonMutation] = useMutation(updateLesson);

  const handleLessonFormSubmit: LessonFormSubmitHandler = async values => {
    if (!lessonId) return;
    await updateLessonMutation({
      ...values,
      id: lessonId,
      date: new Date(values.date),
    });
    refetchLessonData().catch(() => {});
  };

  const handleLessonFormOpen = (): void => {
    setState(prevState => ({ ...prevState, editing: true }));
  };
  const handleLessonFormClose = (): void => {
    setState(prevState => ({ ...prevState, editing: false }));
  };

  return (
    <>
      <LessonForm
        open={state.editing}
        initialValues={
          lessonData && {
            ...lessonData,
            date: lessonData.date.toISOString().split('T')[0]!,
          }
        }
        submitText='Update'
        onSubmit={handleLessonFormSubmit}
        onClose={handleLessonFormClose}
      />

      <Card loading={isLessonLoading}>
        <CardTitle>
          <Flex horizontal='space-between' fullWidth>
            {lessonData?.date.toLocaleDateString()}{' '}
            <Button size='xs' square onClick={handleLessonFormOpen}>
              <Icon size='xs'>
                <PencilIcon />
              </Icon>
            </Button>
          </Flex>
        </CardTitle>
        {lessonData?.description}
      </Card>
    </>
  );
};

LessonPage.getLayout = (page): ReactElement => (
  <DefaultLayout title='Lesson'>{page}</DefaultLayout>
);
export default LessonPage;
