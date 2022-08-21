import { FC } from 'react';

import { useTheme } from '../theme';

import { FlexAlign, FlexDirection, FlexProps } from './Flex.types';

const getDirectionClass = (direction: FlexDirection | undefined): string => {
  const directions: Record<FlexDirection, string> = {
    row: 'flex-row',
    column: 'flex-col',
  };

  return directions[direction ?? 'row'];
};

const getJustifyContentClass = (
  direction: FlexDirection | undefined,
  horizontal: FlexAlign | undefined,
  vertical: FlexAlign | undefined,
): string => {
  return {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  }[(direction === 'column' ? vertical : horizontal) ?? 'start'];
};

const getAlignItemsClass = (
  direction: FlexDirection | undefined,
  horizontal: FlexAlign | undefined,
  vertical: FlexAlign | undefined,
): string => {
  return {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  }[(direction === 'column' ? horizontal : vertical) ?? 'start'];
};

const Flex: FC<FlexProps> = props => {
  const theme = useTheme();

  const classes = [
    'flex',
    props.fullWidth && 'w-full',
    getDirectionClass(props.direction),
    getJustifyContentClass(props.direction, props.horizontal, props.vertical),
    getAlignItemsClass(props.direction, props.horizontal, props.vertical),
  ]
    .filter(item => !!item)
    .join(' ');

  return (
    <div
      className={classes}
      style={{ gap: props.gap ? theme.spacing[props.gap] : undefined }}
    >
      {props.children}
    </div>
  );
};

export default Flex;
