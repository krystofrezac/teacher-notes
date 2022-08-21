import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { TextInputProps } from './TextInput.types';

const TextInput: React.FC<TextInputProps> = props => {
  // Persisted error is the last error so we can do error transition
  const [error, setError] = useState({ show: false, value: '&nbsp;' });

  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const tempError = errors[props.name];
  const tempErrorMessage = Array.isArray(tempError)
    ? tempError?.join(', ')
    : tempError?.message || tempError;

  useEffect(() => {
    if (tempErrorMessage)
      setError({ show: true, value: tempErrorMessage.toString() });
    else setError(prevError => ({ ...prevError, show: false }));
  }, [tempErrorMessage]);

  return (
    <div className='form-control w-full'>
      <label className='label'>
        <span className='label-text first-letter:capitalize'>
          {props.label}
        </span>
      </label>
      <input
        type={props.type}
        className={`input input-bordered w-full  ${
          error.show ? 'input-error' : ''
        }`}
        disabled={isSubmitting}
        {...register(props.name)}
      />
      <label className='label'>
        <span
          className={`label-text-alt text-error first-letter:capitalize transition-opacity opacity-0 ${
            error.show ? 'opacity-100' : ''
          }`}
        >
          {error.value}
        </span>
      </label>
    </div>
  );
};

export default TextInput;
