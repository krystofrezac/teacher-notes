export type SpinnerSize = 'md' | 'lg';
export type SpinnerStatus = 'basic' | 'primary';

export interface SpinnerProps {
  className?: string;
  size?: SpinnerSize;
  hidden?: boolean;
  status?: SpinnerStatus;
}
