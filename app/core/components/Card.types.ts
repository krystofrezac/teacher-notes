import React from 'react';

export type CardWidth = 'md' | 'default';

export interface CardProps {
  children: React.ReactNode;
  width?: CardWidth;
  noPadding?: boolean;
  noGap?: boolean;
  loading?: boolean;
}

export interface CardTitleProps {
  children?: string;
}

export interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}
