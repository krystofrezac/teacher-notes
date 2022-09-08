import { ChangeEventHandler, ReactElement, useState } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { Routes } from '@blitzjs/next';
import { useMutation, useQuery } from '@blitzjs/rpc';
import {
  ChevronRightIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';

import Button from 'app/core/components/Button';
import { CardActions } from 'app/core/components/Card';
import CardTable from 'app/core/components/CardTable';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';
import DefaultLayout from 'app/core/layouts/Default';
import StudentDeleteModal from 'app/students/components/StudentDeleteModal';
import StudentForm from 'app/students/components/StudentForm';
import { StudentFormSubmitHandler } from 'app/students/components/StudentForm.types';
import createStudent from 'app/students/mutations/createStudent';
import deleteStudent from 'app/students/mutations/deleteStudent';
import updateStudent from 'app/students/mutations/updateStudent';
import getStudents from 'app/students/queries/getStudents';

const StudentsPage: BlitzPage = () => {
  const [state, setState] = useState({
    filter: '',
    creatingStudent: false,
    updatingStudentId: undefined as number | undefined,
    deletingStudentId: undefined as number | undefined,
  });

  const splitFilter = state.filter.split(' ');
  const [data, { isLoading, refetch, isRefetching }] = useQuery(
    getStudents,
    {
      where: {
        OR: [
          {
            firstName: { contains: state.filter, mode: 'insensitive' },
          },
          { lastName: { contains: state.filter, mode: 'insensitive' } },
          { firstName: { contains: splitFilter[0], mode: 'insensitive' } },
          (splitFilter[1]?.length ?? 0) > 0
            ? { lastName: { contains: splitFilter[1], mode: 'insensitive' } }
            : {},
        ],
      },
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    },
    {
      suspense: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  const [createStudentMutation] = useMutation(createStudent);
  const [updateStudentMutation] = useMutation(updateStudent);
  const [deleteStudentMutation] = useMutation(deleteStudent);

  const handleStudentFormSubmit: StudentFormSubmitHandler = async values => {
    if (state.creatingStudent) await createStudentMutation(values);
    else if (state.updatingStudentId !== undefined)
      await updateStudentMutation({
        id: state.updatingStudentId,
        ...values,
      });

    refetch().catch(() => {});
  };
  const handleStudentFormClose = (): void => {
    setState(prevState => ({
      ...prevState,
      creatingStudent: false,
      updatingStudentId: undefined,
    }));
  };

  const handleStudentDeleteModalSubmit = async (): Promise<void> => {
    if (!state.deletingStudentId) return;
    await deleteStudentMutation({ id: state.deletingStudentId });
    refetch().catch(() => {});
  };
  const handleStudentDeleteModalCancel = (): void => {
    setState(prevState => ({ ...prevState, deletingStudentId: undefined }));
  };

  const handleCreateStudent = (): void => {
    setState(prevState => ({ ...prevState, creatingStudent: true }));
  };
  const handleUpdateStudent = (id: number): void => {
    setState(prevState => ({ ...prevState, updatingStudentId: id }));
  };
  const handleDeleteStudent = (id: number): void => {
    setState(prevState => ({ ...prevState, deletingStudentId: id }));
  };

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = e => {
    setState(prevState => ({ ...prevState, filter: e.target.value }));
  };

  const getStudentFormsubmitText = (): string | undefined => {
    if (state.creatingStudent) return 'Create';
    if (state.updatingStudentId !== undefined) return 'Update';
  };

  const updatingStudent = data?.students.find(
    student => student.id === state.updatingStudentId,
  );
  const deletingStudent = data?.students.find(
    student => student.id === state.deletingStudentId,
  );

  return (
    <>
      <StudentForm
        open={state.creatingStudent || state.updatingStudentId !== undefined}
        initialValues={updatingStudent}
        submitText={getStudentFormsubmitText()}
        onSubmit={handleStudentFormSubmit}
        onClose={handleStudentFormClose}
      />
      <StudentDeleteModal
        open={state.deletingStudentId !== undefined}
        studentName={`${deletingStudent?.firstName} ${deletingStudent?.lastName}`}
        onSubmit={handleStudentDeleteModalSubmit}
        onClose={handleStudentDeleteModalCancel}
      />

      <CardTable
        tableLoading={isLoading || isRefetching}
        data={data?.students}
        columns={[
          { key: 'name', render: row => `${row.firstName} ${row.lastName}` },
        ]}
        rowActions={(student): ReactElement[] => [
          <Button
            key='delete'
            size='xs'
            variant='ghost'
            square
            onClick={(): void => handleDeleteStudent(student.id)}
          >
            <Icon size='xs' variant='error'>
              <TrashIcon />
            </Icon>
          </Button>,
          <Button
            key='update'
            size='xs'
            variant='ghost'
            square
            onClick={(): void => handleUpdateStudent(student.id)}
          >
            <Icon size='xs'>
              <PencilIcon />
            </Icon>
          </Button>,
          <Link
            key='detail'
            href={Routes.LessonsPage({ studentId: student.id })}
          >
            <Button size='xs' square>
              <Icon size='xs'>
                <ChevronRightIcon />
              </Icon>
            </Button>
          </Link>,
        ]}
        header={
          <Flex gap='1' vertical='center'>
            <input
              className='input input-bordered input-sm input-ghost grow'
              placeholder='Filter'
              value={state.filter}
              onChange={handleFilterChange}
            />
            <CardActions>
              <Button
                variant='primary'
                size='sm'
                square
                onClick={handleCreateStudent}
              >
                <Icon size='sm'>
                  <PlusIcon />
                </Icon>
              </Button>
            </CardActions>
          </Flex>
        }
        hideTableHeader
      />
    </>
  );
};

StudentsPage.authenticate = { redirectTo: Routes.LoginPage() };
StudentsPage.getLayout = (page): ReactElement => (
  <DefaultLayout title='Student'>{page}</DefaultLayout>
);
export default StudentsPage;
