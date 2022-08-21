import { ChangeEventHandler, ReactElement, useState } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { useMutation, useQuery } from '@blitzjs/rpc';
import {
  ChevronRightIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';

import Button from 'app/core/components/Button';
import Card, { CardActions } from 'app/core/components/Card';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';
import Spacer from 'app/core/components/Spacer';
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
  const [data, { isLoading, isSuccess, refetch }] = useQuery(
    getStudents,
    {
      where: {
        OR: [
          {
            firstName: { contains: state.filter },
          },
          { lastName: { contains: state.filter } },
          { firstName: { contains: splitFilter[0] } },
          (splitFilter[1]?.length ?? 0) > 0
            ? { lastName: { contains: splitFilter[1] } }
            : {},
        ],
      },
    },
    {
      suspense: false,
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

    await refetch();
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
    await refetch();
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

  const getStudentFormActionText = (): string | undefined => {
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
        actionText={getStudentFormActionText()}
        onSubmit={handleStudentFormSubmit}
        onClose={handleStudentFormClose}
      />
      <StudentDeleteModal
        open={state.deletingStudentId !== undefined}
        studentName={`${deletingStudent?.firstName} ${deletingStudent?.lastName}`}
        onSubmit={handleStudentDeleteModalSubmit}
        onClose={handleStudentDeleteModalCancel}
      />

      <Card loading={isLoading} noPadding>
        <Spacer all='1' bottom='0'>
          <CardActions>
            <input
              className='input input-bordered input-sm input-ghost grow'
              placeholder='Filter'
              value={state.filter}
              onChange={handleFilterChange}
            />
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
        </Spacer>

        {isSuccess && data?.count === 0 && (
          <Flex horizontal='center' fullWidth>
            <Spacer top='1'>{`You don't have any students.`}</Spacer>
          </Flex>
        )}
        <table className='table'>
          <tbody>
            {data?.students.map(student => (
              <tr key={student.id}>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                <td>
                  <Flex gap='1/2' horizontal='end'>
                    <Button
                      size='xs'
                      variant='ghost'
                      square
                      onClick={(): void => handleDeleteStudent(student.id)}
                    >
                      <Icon size='xs' variant='error'>
                        <TrashIcon />
                      </Icon>
                    </Button>
                    <Button
                      size='xs'
                      variant='ghost'
                      square
                      onClick={(): void => handleUpdateStudent(student.id)}
                    >
                      <Icon size='xs'>
                        <PencilIcon />
                      </Icon>
                    </Button>
                    <Button size='xs' square>
                      <Icon size='xs'>
                        <ChevronRightIcon />
                      </Icon>
                    </Button>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

StudentsPage.authenticate = true;
StudentsPage.getLayout = (page): ReactElement => (
  <DefaultLayout title='Students'>{page}</DefaultLayout>
);
export default StudentsPage;
