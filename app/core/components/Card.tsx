import React from 'react';

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

const Card: React.FC<CardProps> = props => (
  <div
    className={`card overflow-visible bg-base-100 shadow-xl ${getWidthClass(
      props.width,
    )}`}
  >
    <OverlayContainer>
      <div className={`card-body ${props.noPadding ? 'p-0' : 'p-4'}`}>
        {props.children}
        <Overlay open={!!props.loading}>
          <Spinner hidden={!props.loading} size='lg' />
        </Overlay>
      </div>
    </OverlayContainer>
  </div>
);

export const CardTitle: React.FC<CardTitleProps> = props => (
  <h2 className='card-title'>{props.children}</h2>
);

export const CardActions: React.FC<CardActionsProps> = props => (
  <div className={`card-actions justify-end ${props.className ?? ''}`}>
    {props.children}
  </div>
);

export default Card;
