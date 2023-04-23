import { useEffect, useState } from 'react';

import {
  FieldValues,
  useFormContext,
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

interface UseFormFieldReturn {
  inputProps: UseFormRegisterReturn;
  error: { show: boolean; value: string };
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const useFormField = (name: string): UseFormFieldReturn => {
  const [error, setError] = useState({ show: false, value: '&nbsp;' });

  const {
    register,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = useFormContext();

  const tempError = errors[name];
  const tempErrorMessage = Array.isArray(tempError)
    ? tempError?.join(', ')
    : tempError?.message || tempError;

  useEffect(() => {
    if (tempErrorMessage)
      setError({ show: true, value: tempErrorMessage.toString() });
    else setError(prevError => ({ ...prevError, show: false }));
  }, [tempErrorMessage]);

  const inputProps = {
    disabled: isSubmitting,
    ...register(name),
  };

  return { inputProps, error, setValue, watch };
};

export default useFormField;
