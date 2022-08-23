import { ReactElement } from 'react';

import { BlitzPage, useParam } from '@blitzjs/next';
import { useQuery } from '@blitzjs/rpc';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/outline';

import Button from 'app/core/components/Button';
import { CardTitle } from 'app/core/components/Card';
import CardTable from 'app/core/components/CardTable';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';
import DefaultLayout from 'app/core/layouts/Default';
import getLessons from 'app/lessons/queries/getLessons';
import getStudent from 'app/students/queries/getStudent';

const LessonsPage: BlitzPage = () => {
  const id = useParam('id', 'number');

  const [studentData, { isLoading: isStudentLoading }] = useQuery(
    getStudent,
    { id: id ?? 0 },
    { suspense: false, enabled: id !== undefined },
  );
  const [lessonsData, { isLoading: isLessonsLoading }] = useQuery(
    getLessons,
    { where: { studentId: id } },
    { suspense: false },
  );

  return (
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
          <Button variant='primary' size='sm' square>
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
      tableLoading={!isStudentLoading && isLessonsLoading}
    />
  );
};

LessonsPage.getLayout = (page): ReactElement => (
  <DefaultLayout title="Student's lessons">{page}</DefaultLayout>
);

export default LessonsPage;
