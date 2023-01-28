import { ChangeEventHandler, ReactElement, useState } from 'react';

import { BlitzPage } from '@blitzjs/auth';
import { Routes } from '@blitzjs/next';
import { useQuery } from '@blitzjs/rpc';
import { Lesson, Student } from '@prisma/client';

import Card from 'app/core/components/Card';
import Flex from 'app/core/components/Flex';
import Spacer from 'app/core/components/Spacer';
import DefaultLayout from 'app/core/layouts/Default';
import LessonsTable from 'app/lessons/components/LessonsTable';
import getLessons from 'app/lessons/queries/getLessons';

const StudentSearchPage: BlitzPage = () => {
  const [state, setState] = useState({ filter: '' });

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = e => {
    setState(prevState => ({ ...prevState, filter: e.target.value }));
  };

  const isFilterEmpty = state.filter === '';

  const [data] = useQuery(
    getLessons,
    {
      where: {
        description: {
          contains: state.filter,
          mode: 'insensitive',
        },
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

  return (
    <Card noPadding>
      <Spacer all='1'>
        <input
          className='input input-bordered input-sm input-ghost grow w-full'
          placeholder='Filter'
          value={state.filter}
          onChange={handleFilterChange}
        />
      </Spacer>

      {mappedResults}
      <Flex horizontal='center'>
        <Spacer all='1'>{isFilterEmpty && 'Filter is empty!'}</Spacer>
      </Flex>
    </Card>
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
