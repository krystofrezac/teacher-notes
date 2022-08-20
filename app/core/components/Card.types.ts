import React from 'react';

export type CardWidth = 'md' | 'default';

export interface CardProps {
  children: React.ReactNode;
  width?: CardWidth;
  noPadding?: boolean;
  loading?: boolean;
}

export interface CardTitleProps {
  children: React.ReactNode;
}

export interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}
