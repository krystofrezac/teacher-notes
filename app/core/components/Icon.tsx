import React from 'react';

import { IconProps, IconSize, IconVariant } from './Icon.types';

const getSizeClass = (size?: IconSize): string => {
  const sizes: Record<IconSize, string> = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  return sizes[size ?? 'md'];
};

const getVariantClass = (variant?: IconVariant): string => {
  const variants: Record<IconVariant, string> = {
    default: '',
    error: 'text-error',
  };

  return variants[variant ?? 'default'];
};

const Icon: React.FC<IconProps> = props => {
  return (
    <div
      className={`${getSizeClass(props.size)} ${getVariantClass(
        props.variant,
      )}`}
    >
      {props.children}
    </div>
  );
};

export default Icon;
