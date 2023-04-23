import React from 'react';

export interface DropdownProps {
  trigger?: React.ReactNode;
  options: React.ReactElement[];
  open?: boolean;

  top?: boolean;
  end?: boolean;
  left?: boolean;
  right?: boolean;
}
