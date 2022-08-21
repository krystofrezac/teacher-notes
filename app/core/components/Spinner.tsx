import { SpinnerProps, SpinnerSize } from './Spinner.types';

const getSpinnerSizeClass = (size?: SpinnerSize): string => {
  const sizes: Record<SpinnerSize, string> = {
    md: 'h-5 w-5',
    lg: 'h-8 w-8',
  };

  return sizes[size ?? 'md'];
};

const Spinner: React.FC<SpinnerProps> = props => (
  <svg
    className={`animate-spin ${getSpinnerSizeClass(
      props.size,
    )} text-white transition-opacity ${
      props.hidden ? 'opacity-0' : 'opacity-100'
    } ${props.className ?? ''}`}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25 text-white'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
);

export default Spinner;
