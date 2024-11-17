import { ReactElement, useState } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { Routes } from '@blitzjs/next';
import { useQuery } from '@blitzjs/rpc';
import { Lesson, Student } from '@prisma/client';

import Button from 'app/core/components/Button';
import Card from 'app/core/components/Card';
import Flex from 'app/core/components/Flex';
import Spacer from 'app/core/components/Spacer';
import DefaultLayout from 'app/core/layouts/Default';
import LessonsTable from 'app/lessons/components/LessonsTable';
import getLessons from 'app/lessons/queries/getLessons';
import StudentSearchModal, {
  StudentFilterFormSubmitHandler,
  StudentSearchFormValues,
} from 'app/students/components/StudentSearchModal';

type State = {
  modalOpen: boolean;
};

const getFilter = (): StudentSearchFormValues | null => {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line no-restricted-globals
  const search = new URLSearchParams(location.search);
  const filter = search.get('filter');
  if (!filter) return null;

  try {
    return JSON.parse(filter) ?? null;
  } catch {
    return null;
  }
};

const setFilter = (filter: StudentSearchFormValues | null): void => {
  // eslint-disable-next-line no-restricted-globals
  const url = new URL(location.toString());
  url.searchParams.set('filter', JSON.stringify(filter));
  // eslint-disable-next-line no-restricted-globals
  location.href = url.toString();
};

const StudentSearchPage: BlitzPage = () => {
  const [state, setState] = useState<State>({ modalOpen: false });

  const filter = getFilter();

  const handleUpdateFilterClick = (): void =>
    setState(prevState => ({ ...prevState, modalOpen: true }));
  const handleModalClose = (): void => {
    setState(prevState => ({ ...prevState, modalOpen: false }));
  };
  const handleFormSubmit: StudentFilterFormSubmitHandler = values => {
    setFilter(values);
  };

  const isFilterEmpty = !filter;
  const [data] = useQuery(
    getLessons,
    {
      where: {
        description: {
          contains: filter?.description,
          mode: 'insensitive',
        },
        ...(filter?.tags
          ? {
              TagsOnLessons: {
                some: {
                  tagId: { in: filter?.tags?.map(tag => tag.id) },
                },
              },
            }
          : {}),
      },
      orderBy: [
        {
          student: { firstName: 'asc' },
        },
        {
          student: { lastName: 'asc' },
        },
      ],
      include: { student: true },
    },
    { suspense: false, enabled: !isFilterEmpty },
  );

  const groupedLessons = data?.lessons.reduce<
    {
      student: Student;
      lessons: Lesson[];
    }[]
  >((acc, curr) => {
    const lastStudent = acc.at(-1);
    if (lastStudent?.student.id === curr.studentId) {
      lastStudent.lessons.push(curr);

      return acc;
    }

    return [
      ...acc,
      {
        student: curr.student,
        lessons: [curr],
      },
    ];
  }, []);

  const mappedResults = groupedLessons?.map(({ student, lessons }) => {
    return (
      <div key={student.id}>
        <Spacer left='1'>
          <span className='text-xl'>
            {student.firstName} {student.lastName}
          </span>
        </Spacer>
        <LessonsTable lessons={lessons} />
      </div>
    );
  });
  const resultIsEmpty = mappedResults?.length === 0;

  const message =
    (resultIsEmpty && 'No results!') || (isFilterEmpty && 'Filter is empty!');

  return (
    <>
      <StudentSearchModal
        open={state.modalOpen}
        initialValues={filter ?? undefined}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
      />

      <Card noPadding>
        <Spacer top='1'>
          <Flex horizontal='center'>
            <Button
              size='sm'
              variant='primary'
              onClick={handleUpdateFilterClick}
            >
              Update filter
            </Button>
          </Flex>
        </Spacer>

        {mappedResults}
        {message && (
          <Flex horizontal='center'>
            <Spacer all='1'>{message}</Spacer>
          </Flex>
        )}
      </Card>
    </>
  );
};

StudentSearchPage.authenticate = { redirectTo: Routes.LoginPage() };
StudentSearchPage.getLayout = (page): ReactElement => (
  <DefaultLayout
    title='Student'
    backLink={{ link: Routes.StudentsPage(), text: 'Students' }}
  >
    {page}
  </DefaultLayout>
);
export default StudentSearchPage;
