import React from 'react';

import { useTheme } from '../theme';

import {
  CardActionsProps,
  CardProps,
  CardTitleProps,
  CardWidth,
} from './Card.types';
import Overlay, { OverlayContainer } from './Overlay';
import Spinner from './Spinner';

const getWidthClass = (width?: CardWidth): string => {
  const widths: Record<CardWidth, string> = {
    md: 'w-96',
    default: '',
  };

  return widths[width ?? 'default'];
};

const Card: React.FC<CardProps> = props => {
  const theme = useTheme();

  return (
    <div className={`card bg-base-100 shadow-xl ${getWidthClass(props.width)}`}>
      <OverlayContainer>
        <div
          className='card-body'
          style={{
            padding: theme.spacing[props.noPadding ? '0' : '1'],
            gap: theme.spacing[1],
          }}
        >
          {props.children}
          <Overlay open={!!props.loading}>
            <Spinner hidden={!props.loading} size='lg' />
          </Overlay>
        </div>
      </OverlayContainer>
    </div>
  );
};

export const CardTitle: React.FC<CardTitleProps> = props => (
  <h2 className='card-title'>{props.children}</h2>
);

export const CardActions: React.FC<CardActionsProps> = props => {
  const theme = useTheme();

  return (
    <div
      className={`card-actions justify-end ${props.className ?? ''}`}
      style={{ gap: theme.spacing['1'] }}
    >
      {props.children}
    </div>
  );
};

export default Card;
