import { useState } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { Routes, useParam } from '@blitzjs/next';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

import Button from 'app/core/components/Button';
import Card, { CardTitle } from 'app/core/components/Card';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';
import DefaultLayout from 'app/core/layouts/Default';
import LessonDeleteModal from 'app/lessons/components/LessonDeleteModal';
import LessonForm from 'app/lessons/components/LessonForm';
import { LessonFormSubmitHandler } from 'app/lessons/components/LessonForm.types';
import deleteLesson from 'app/lessons/mutations/deleteLesson';
import updateLesson from 'app/lessons/mutations/updateLesson';
import getLesson from 'app/lessons/queries/getLesson';
import Tag from 'app/tags/components/TagsInput/Tag';

const LessonPage: BlitzPage = () => {
  const lessonId = useParam('lessonId', 'number');
  const router = useRouter();
  const [state, setState] = useState({
    editing: false,
    deleting: false,
  });
  const [
    lessonData,
    { isLoading: isLessonLoading, refetch: refetchLessonData },
  ] = useQuery(getLesson, { id: lessonId ?? -1 }, { suspense: false });
  const [updateLessonMutation] = useMutation(updateLesson);
  const [deleteLessonMutation] = useMutation(deleteLesson);

  const handleLessonFormSubmit: LessonFormSubmitHandler = async values => {
    if (!lessonId) return;
    await updateLessonMutation({
      ...values,
      id: lessonId,
      date: new Date(values.date),
      tagIds: values.tags?.map(tag => tag.id) ?? [],
    });
    refetchLessonData().catch(() => {});
  };
  const handleLessonFormOpen = (): void => {
    setState(prevState => ({ ...prevState, editing: true }));
  };
  const handleLessonFormClose = (): void => {
    setState(prevState => ({ ...prevState, editing: false }));
  };

  const handleLessonDeleteModalSubmit = async (): Promise<void> => {
    if (!lessonId) return;
    await deleteLessonMutation({ id: lessonId });
    router
      .push(Routes.LessonsPage({ studentId: lessonData?.studentId ?? -1 }))
      .catch(() => {});
  };
  const handleLessonDeleteModalOpen = (): void => {
    setState(prevState => ({ ...prevState, deleting: true }));
  };
  const handleLessonDeleteModalClose = (): void => {
    setState(prevState => ({ ...prevState, deleting: false }));
  };

  return (
    <DefaultLayout
      title='Lesson'
      backLink={{
        link: Routes.LessonsPage({ studentId: lessonData?.studentId ?? -1 }),
        text: `${lessonData?.student.firstName ?? ''} ${
          lessonData?.student.lastName ?? ''
        }`,
      }}
    >
      <LessonForm
        open={state.editing}
        initialValues={
          lessonData && {
            ...lessonData,
            date: lessonData.date.toISOString().split('T')[0]!,
            tags: lessonData.TagsOnLessons.map(t => t.tag),
          }
        }
        submitText='Update'
        onSubmit={handleLessonFormSubmit}
        onClose={handleLessonFormClose}
      />
      <LessonDeleteModal
        open={!!state.deleting}
        onSubmit={handleLessonDeleteModalSubmit}
        onClose={handleLessonDeleteModalClose}
      />

      <Card loading={isLessonLoading}>
        <Flex horizontal='space-between' vertical='center' fullWidth>
          <CardTitle>{lessonData?.date.toLocaleDateString()}</CardTitle>
          <Flex gap='1/2'>
            <Button
              size='sm'
              variant='error'
              square
              onClick={handleLessonDeleteModalOpen}
            >
              <Icon size='sm'>
                <TrashIcon />
              </Icon>
            </Button>
            <Button size='sm' square onClick={handleLessonFormOpen}>
              <Icon size='sm'>
                <PencilIcon />
              </Icon>
            </Button>
          </Flex>
        </Flex>
        <Flex gap='1/2' wrap>
          {lessonData?.TagsOnLessons.map(({ tag }) => (
            <Tag key={tag.id} title={tag.title} />
          ))}
        </Flex>
        {lessonData?.description}
      </Card>
    </DefaultLayout>
  );
};

LessonPage.authenticate = true;
export default LessonPage;
