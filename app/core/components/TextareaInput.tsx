import { FC } from 'react';

import useFormField from '../hooks/useFormField';

import { TextareaInputProps } from './TextareaInput.types';

const TextareaInput: FC<TextareaInputProps> = props => {
  const { inputProps, error } = useFormField(props.name);

  return (
    <div className='form-control w-full'>
      <label className='label'>
        <span className='label-text first-letter:capitalize'>
          {props.label}
        </span>
      </label>
      <textarea
        className={`textarea textarea-bordered w-full  ${
          error.show ? 'textarea-error' : ''
        }`}
        {...inputProps}
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

export default TextareaInput;
