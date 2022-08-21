import React from 'react';

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline';

import { AlertProps, AlertType } from './Alert.types';

const getIcon = (type?: AlertType): React.ReactElement => {
  const icons: Record<AlertType, React.ReactElement> = {
    default: <InformationCircleIcon />,
    info: <InformationCircleIcon />,
    success: <CheckCircleIcon />,
    warning: <ExclamationCircleIcon />,
    error: <XCircleIcon />,
  };

  return icons[type ?? 'default'];
};

const getTypeClass = (type?: AlertType): string => {
  const classes: Record<AlertType, string> = {
    default: '',
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  };

  return classes[type ?? 'default'];
};

const Alert: React.FC<AlertProps> = props => (
  <div
    className={`alert shadow-lg ${getTypeClass(props.type)} ${
      props.className ?? ''
    }`}
  >
    <div>
      <span className='w-6 h-6'>{getIcon(props.type)}</span>
      <span>{props.children}</span>
    </div>
  </div>
);

export default Alert;
