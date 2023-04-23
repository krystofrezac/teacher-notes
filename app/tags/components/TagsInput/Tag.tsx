import { FC } from 'react';

import { XIcon } from '@heroicons/react/outline';

import Button from 'app/core/components/Button';
import Flex from 'app/core/components/Flex';
import Icon from 'app/core/components/Icon';

type TagProps = {
  title: string;

  onRemove?: () => void;
};

const Tag: FC<TagProps> = ({ title, onRemove }) => {
  return (
    <div className='badge'>
      <Flex horizontal='center' vertical='center' gap='1/4'>
        <span className='whitespace-nowrap'>{title}</span>
        {onRemove && (
          <Button simple onClick={onRemove}>
            <Icon size='xs'>
              <XIcon />
            </Icon>
          </Button>
        )}
      </Flex>
    </div>
  );
};
export default Tag;
