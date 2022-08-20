import { useFormContext } from 'react-hook-form';

import Button from './Button';
import { ButtonProps } from './Button.types';

const FormButton: React.FC<Omit<ButtonProps, 'loading'>> = props => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return <Button {...props} loading={isSubmitting} />;
};

export default FormButton;
