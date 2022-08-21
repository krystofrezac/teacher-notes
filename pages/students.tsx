import { ChangeEventHandler, ReactElement, useState } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { PlusIcon } from '@heroicons/react/outline';

import Button from 'app/core/components/Button';
import Card, { CardActions } from 'app/core/components/Card';
import Icon from 'app/core/components/Icon';
import DefaultLayout from 'app/core/layouts/Default';
import StudentForm from 'app/students/components/StudentForm';
import { StudentFormSubmitHandler } from 'app/students/components/StudentForm.types';
import createStudent from 'app/students/mutations/createStudent';
import getStudents from 'app/students/queries/getStudents';

const StudentsPage: BlitzPage = () => {
  const [state, setState] = useState({ creatingCollection: false, filter: '' });

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

  const handleStudentFormSubmit: StudentFormSubmitHandler = async values => {
    await createStudentMutation(values);
    await refetch();
  };

  const handleStudentFormClose = (): void => {
    setState(prevState => ({ ...prevState, creatingCollection: false }));
  };

  const handleCreateCollection = (): void => {
    setState(prevState => ({ ...prevState, creatingCollection: true }));
  };

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = e => {
    setState(prevState => ({ ...prevState, filter: e.target.value }));
  };

  return (
    <>
      <StudentForm
        open={state.creatingCollection}
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
