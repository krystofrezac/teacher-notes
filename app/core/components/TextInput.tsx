import useFormField from '../hooks/useFormField';

import { TextInputProps } from './TextInput.types';

const TextInput: React.FC<TextInputProps> = props => {
  const { inputProps, error } = useFormField(props.name);

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

export default TextInput;
