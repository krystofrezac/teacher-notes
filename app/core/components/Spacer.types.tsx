import { ReactNode } from 'react';

import { SpacingKey } from '../theme';

export interface SpacerProps {
  all?: SpacingKey;
  left?: SpacingKey;
  right?: SpacingKey;
  top?: SpacingKey;
  bottom?: SpacingKey;
  children: ReactNode;
}
