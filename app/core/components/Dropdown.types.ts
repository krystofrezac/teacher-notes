import React from 'react';

export interface DropdownProps {
  trigger: React.ReactNode;
  options: React.ReactElement[];

  top?: boolean;
  end?: boolean;
  left?: boolean;
  right?: boolean;
}
