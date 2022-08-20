import React from 'react';

export type AlertType = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  children: React.ReactNode;
  className?: string;
  type?: AlertType;
}
