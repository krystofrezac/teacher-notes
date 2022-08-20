import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  element?: React.ElementType;
  type?: 'submit' | 'reset' | 'button';

  variant?: ButtonVariant;
  size?: ButtonSize;
  square?: boolean;
  /** If btn classes should not be applied */
  simple?: boolean;
  loading?: boolean;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
