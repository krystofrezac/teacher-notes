import React from 'react';

import { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';
import Spinner from './Spinner';

const getButtonVariantClass = (variant?: ButtonVariant): string => {
  if (!variant) return '';

  const variants: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    ghost: 'btn-ghost',
    link: 'btn-link text-base-content',
  };

  return variants[variant];
};

const getButtonSizeClass = (size?: ButtonSize): string => {
  if (!size) return '';

  const sizes: Record<ButtonSize, string> = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  return sizes[size];
};

const Button: React.FC<ButtonProps> = React.forwardRef((props, ref) => {
  const simple = props.simple === true;

  const classes = [
    'relative',
    !simple && 'btn',
    'flex gap-2',
    props.className,
    props.square && 'btn-square',
    props.noPadding && 'p-0',
    props.normalCase && 'normal-case',
    !simple && getButtonSizeClass(props.size),
    !simple && getButtonVariantClass(props.variant),
  ]
    .filter(i => i)
    .join(' ');

  return React.createElement(
    props.element ?? 'button',
    {
      className: classes,
      ref,
      type: props.type,
      onClick: !props.loading ? props.onClick : undefined,
    },
    <>
      <div
        className={`absolute w-full h-full bg-gray-900 rounded-lg bg-opacity-30 transition-opacity ${
          !props.loading && 'opacity-0'
        }`}
      />
      <Spinner
        className={`absolute ml-auto mr-auto mt-auto mb-auto transition-opacity ${
          props.loading ? 'opacity-100' : 'opacity-0'
        }`}
        hidden={!props.loading}
      />
      {props.children}
    </>,
  );
});

export default Button;
