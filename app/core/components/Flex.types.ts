import { ReactNode } from 'react';

import { SpacingKey } from '../theme';

export type FlexDirection = 'column' | 'row';
export type FlexAlign = 'start' | 'center' | 'end';

export interface FlexProps {
  children: ReactNode;

  direction?: FlexDirection;
  gap?: SpacingKey;
  horizontal?: FlexAlign;
  vertical?: FlexAlign;

  fullWidth?: boolean;
}
