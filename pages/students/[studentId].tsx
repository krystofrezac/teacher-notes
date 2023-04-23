import { ReactElement, useState } from 'react';

import { BlitzPage, Routes, useParam } from '@blitzjs/next';
import { useMutation, useQuery } from '@blitzjs/rpc';
import {
  AdjustmentsIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

import Button from 'app/core/components/Button';
import { CardTitle } from 'app/core/components/Card';
import CardTable from 'app/core/components/CardTable';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';
import DefaultLayout from 'app/core/layouts/Default';
import LessonFilterForm from 'app/lessons/components/LessonFilterForm';
import { LessonFilterFormSubmitHandler } from 'app/lessons/components/LessonFilterForm.types';
import LessonForm from 'app/lessons/components/LessonForm';
import { LessonFormSubmitHandler } from 'app/lessons/components/LessonForm.types';
import createLesson from 'app/lessons/mutations/createLesson';
import getLessons from 'app/lessons/queries/getLessons';
import getStudent from 'app/students/queries/getStudent';

const LessonsPage: BlitzPage = () => {
  const studentId = useParam('studentId', 'number');
  const [state, setState] = useState({
    creatingLesson: false,
    filter: null as {
      description: string;
      tags?: { id: number; title: string }[];
    } | null,
    filterOpen: false,
  });
  const [studentData, { isLoading: isStudentLoading }] = useQuery(
    getStudent,
    { id: studentId ?? -1 },
    { suspense: false, enabled: studentId !== undefined },
  );

  const filterWhere: Prisma.LessonWhereInput = {
    description: {
      contains: state.filter?.description,
      mode: 'insensitive',
    },
    ...(state.filter?.tags
      ? {
          TagsOnLessons: {
            some: {
              tagId: {
                in: state.filter.tags.map(({ id }) => id),
              },
            },
          },
        }
      : {}),
  };
  const [
    lessonsData,
    {
      isLoading: isLessonsLoading,
      isRefetching: isLessonsRefetching,
      refetch: refetchLessons,
    },
  ] = useQuery(
    getLessons,
    {
      where: {
        studentId,
        ...(state.filter ? filterWhere : {}),
      },
      orderBy: { date: 'desc' },
    },
    { suspense: false },
  );
  const [createLessonMutation] = useMutation(createLesson);

  const handleLessonFormSubmit: LessonFormSubmitHandler = async values => {
    if (!studentId) return;
    await createLessonMutation({
      ...values,
      date: new Date(values.date),
      studentId,
      tagIds: values.tags?.map(tag => tag.id) ?? [],
    });
    refetchLessons().catch(() => {});
  };
  const handleLessonFormOpen = (): void => {
    setState(prevState => ({ ...prevState, creatingLesson: true }));
  };
  const handleLessonFormClose = (): void => {
    setState(prevState => ({ ...prevState, creatingLesson: false }));
  };

  const handleLessonFilterFormSubmit: LessonFilterFormSubmitHandler =
    values => {
      setState(prevState => ({ ...prevState, filter: values }));
    };
  const handleLessonFilterFormClear = (): void => {
    setState(prevState => ({ ...prevState, filter: null }));
  };
  const handleLessonFilterFormOpen = (): void => {
    setState(prevState => ({ ...prevState, filterOpen: true }));
  };
  const handleLessonFilterFormClose = (): void => {
    setState(prevState => ({ ...prevState, filterOpen: false }));
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
      <LessonFilterForm
        open={state.filterOpen}
        initialValues={state.filter ?? undefined}
        onSubmit={handleLessonFilterFormSubmit}
        onClear={handleLessonFilterFormClear}
        onClose={handleLessonFilterFormClose}
      />

      <CardTable
        data={lessonsData?.lessons}
        columns={[
          {
            key: 'all',
            render: row => (
              <Flex direction='column'>
                <span>{row.date.toLocaleDateString()}</span>
              </Flex>
            ),
          },
        ]}
        header={
          <Flex horizontal='space-between' vertical='center'>
            <CardTitle>{`${studentData?.firstName ?? ''} ${
              studentData?.lastName ?? ''
            }`}</CardTitle>
            <Flex gap='1/2'>
              <Button
                variant='ghost'
                size='sm'
                square
                onClick={handleLessonFilterFormOpen}
              >
                <Icon size='sm'>
                  <AdjustmentsIcon />
                </Icon>
              </Button>
              <Button
                variant='primary'
                size='sm'
                square
                onClick={handleLessonFormOpen}
              >
                <Icon size='sm'>
                  <PlusIcon />
                </Icon>
              </Button>
            </Flex>
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
