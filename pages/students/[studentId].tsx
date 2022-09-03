import { ReactElement, useState } from 'react';

import { BlitzPage, Routes, useParam } from '@blitzjs/next';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';

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
  const studentId = useParam('studentId', 'number');
  const [state, setState] = useState({ creatingLesson: false });
  const [studentData, { isLoading: isStudentLoading }] = useQuery(
    getStudent,
    { id: studentId ?? -1 },
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
    <DefaultLayout
      title="Student's lessons"
      backLink={{ link: Routes.StudentsPage(), text: 'Students' }}
    >
      <LessonForm
        open={state.creatingLesson}
        submitText='Create'
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
        rowActions={(row): ReactElement[] => [
          <Link
            key='lessonLink'
            href={Routes.LessonPage({
              lessonId: row.id,
            })}
          >
            <Button size='xs' square>
              <Icon size='xs'>
                <ChevronRightIcon />
              </Icon>
            </Button>
          </Link>,
        ]}
        hideTableHeader
        cardLoading={isStudentLoading}
        tableLoading={
          !isStudentLoading && (isLessonsLoading || isLessonsRefetching)
        }
      />
    </DefaultLayout>
  );
};

LessonsPage.authenticate = true;
export default LessonsPage;
