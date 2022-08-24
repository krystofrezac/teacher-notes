import { ReactElement, useState } from 'react';

import { BlitzPage, useParam } from '@blitzjs/next';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/outline';

import Button from 'app/core/components/Button';
import { CardTitle } from 'app/core/components/Card';
import CardTable from 'app/core/components/CardTable';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';
import DefaultLayout from 'app/core/layouts/Default';
import LessonForm from 'app/lessons/components/LessonForm';
import { LessonFormSubmitHandler } from 'app/lessons/components/LessonForm.types';
import createLesson from 'app/lessons/mutations/createLesson';
import getLessons from 'app/lessons/queries/getLessons';
import getStudent from 'app/students/queries/getStudent';

const LessonsPage: BlitzPage = () => {
  const studentId = useParam('id', 'number');
  const [state, setState] = useState({ creatingLesson: false });
  const [studentData, { isLoading: isStudentLoading }] = useQuery(
    getStudent,
    { id: studentId ?? 0 },
    { suspense: false, enabled: studentId !== undefined },
  );
  const [
    lessonsData,
    {
      isLoading: isLessonsLoading,
      isRefetching: isLessonsRefetching,
      refetch: refetchLessons,
    },
  ] = useQuery(getLessons, { where: { studentId } }, { suspense: false });
  const [createLessonMutation] = useMutation(createLesson);

  const handleLessonFormSubmit: LessonFormSubmitHandler = async values => {
    if (!studentId) return;
    await createLessonMutation({
      ...values,
      date: new Date(values.date),
      studentId,
    });
    refetchLessons().catch(() => {});
  };
  const handleLessonFormClose = (): void => {
    setState(prevState => ({ ...prevState, creatingLesson: false }));
  };

  const handleCreateLesson = (): void => {
    setState(prevState => ({ ...prevState, creatingLesson: true }));
  };

  return (
    <>
      <LessonForm
        open={state.creatingLesson}
        onSubmit={handleLessonFormSubmit}
        onClose={handleLessonFormClose}
      />

      <CardTable
        data={lessonsData?.lessons}
        columns={[
          {
            key: 'date',
            render: row => row.date.toLocaleDateString(),
          },
        ]}
        header={
          <Flex horizontal='space-between' vertical='center'>
            <CardTitle>{`${studentData?.firstName ?? ''} ${
              studentData?.lastName ?? ''
            }`}</CardTitle>
            <Button
              variant='primary'
              size='sm'
              square
              onClick={handleCreateLesson}
            >
              <Icon size='sm'>
                <PlusIcon />
              </Icon>
            </Button>
          </Flex>
        }
        rowActions={(_row): ReactElement[] => [
          <Button key='ahoj' size='xs' square>
            <Icon size='xs'>
              <ChevronRightIcon />
            </Icon>
          </Button>,
        ]}
        hideTableHeader
        cardLoading={isStudentLoading}
        tableLoading={
          !isStudentLoading && (isLessonsLoading || isLessonsRefetching)
        }
      />
    </>
  );
};

LessonsPage.getLayout = (page): ReactElement => (
  <DefaultLayout title="Student's lessons">{page}</DefaultLayout>
);

export default LessonsPage;
