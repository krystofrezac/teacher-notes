import React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg';
export type IconVariant = 'default' | 'error';

export interface IconProps {
  children: React.ReactNode;
  variant?: IconVariant;
  size?: IconSize;
}
