import { ChangeEventHandler, ReactElement, useState } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { useMutation, useQuery } from '@blitzjs/rpc';
import {
  ChevronRightIcon,
  PencilIcon,
  PlusIcon,
} from '@heroicons/react/outline';

import Button from 'app/core/components/Button';
import Card, { CardActions } from 'app/core/components/Card';
import Icon from 'app/core/components/Icon';
import DefaultLayout from 'app/core/layouts/Default';
import StudentForm from 'app/students/components/StudentForm';
import { StudentFormSubmitHandler } from 'app/students/components/StudentForm.types';
import createStudent from 'app/students/mutations/createStudent';
import updateStudent from 'app/students/mutations/updateStudent';
import getStudents from 'app/students/queries/getStudents';

const StudentsPage: BlitzPage = () => {
  const [state, setState] = useState({
    filter: '',
    creatingCollection: false,
    updatingCollectionId: undefined as number | undefined,
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

  const handleStudentFormSubmit: StudentFormSubmitHandler = async values => {
    if (state.creatingCollection) await createStudentMutation(values);
    else if (state.updatingCollectionId !== undefined)
      await updateStudentMutation({
        id: state.updatingCollectionId,
        ...values,
      });

    await refetch();
  };

  const handleStudentFormClose = (): void => {
    setState(prevState => ({
      ...prevState,
      creatingCollection: false,
      updatingCollectionId: undefined,
    }));
  };

  const handleCreateCollection = (): void => {
    setState(prevState => ({ ...prevState, creatingCollection: true }));
  };

  const handleUpdateCollection = (id: number): void => {
    setState(prevState => ({ ...prevState, updatingCollectionId: id }));
  };

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = e => {
    setState(prevState => ({ ...prevState, filter: e.target.value }));
  };

  const getStudentFormActionText = (): string | undefined => {
    if (state.creatingCollection) return 'Create';
    if (state.updatingCollectionId !== undefined) return 'Update';
  };

  const updatingCollection = data?.students.find(
    student => student.id === state.updatingCollectionId,
  );

  return (
    <>
      <StudentForm
        open={
          state.creatingCollection || state.updatingCollectionId !== undefined
        }
        initialValues={updatingCollection}
        actionText={getStudentFormActionText()}
        onSubmit={handleStudentFormSubmit}
        onClose={handleStudentFormClose}
      />

      <Card loading={isLoading}>
        <CardActions>
          <input
            className='input input-bordered input-sm input-ghost grow mr-2'
            placeholder='Filter'
            value={state.filter}
            onChange={handleFilterChange}
          />
          <Button
            variant='primary'
            size='sm'
            square
            onClick={handleCreateCollection}
          >
            <Icon size='sm'>
              <PlusIcon />
            </Icon>
          </Button>
        </CardActions>
        {isSuccess && data?.count === 0 && "You don't have any students."}
        <table className='table'>
          <tbody>
            {data?.students.map(student => (
              <tr key={student.id}>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                <td>
                  <div className='flex gap-2 justify-end'>
                    <Button
                      size='xs'
                      variant='ghost'
                      square
                      onClick={(): void => handleUpdateCollection(student.id)}
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
                  </div>
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
