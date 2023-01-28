import { FC, ReactElement } from 'react';

import { Routes } from '@blitzjs/next';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { Lesson } from '@prisma/client';
import Link from 'next/link';

import Button from 'app/core/components/Button';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';
import Table from 'app/core/components/Table';

interface LessonsTableProps {
  lessons: Lesson[];
}

const LessonsTable: FC<LessonsTableProps> = ({ lessons }) => (
  <Table
    data={lessons}
    hideHeader
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
    actions={(row): ReactElement[] => [
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
  />
);

export default LessonsTable;
