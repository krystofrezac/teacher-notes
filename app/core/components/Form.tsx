import React, {
  PropsWithoutRef,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, Path, useForm, UseFormProps } from 'react-hook-form';
import { TypeOf, z } from 'zod';

import Alert from './Alert';

interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SubmitHandler<S extends z.ZodType<any, any>> = (
  values: z.infer<S>,
) => Promise<void | OnSubmitResult>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormPropsDefaultS = z.ZodType<any, any>;
export interface FormProps<S extends FormPropsDefaultS>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  schema?: S;
  initialValues: UseFormProps<z.infer<S>>['defaultValues'];
  submitResetTimeout?: number;
  clearErrorsFunction?: React.MutableRefObject<() => void>;
  onSubmit: SubmitHandler<S>;
}

export const FORM_ERROR = 'FORM_ERROR';

const Form = <S extends FormPropsDefaultS>({
  children,
  schema,
  initialValues,
  submitResetTimeout,
  clearErrorsFunction,
  onSubmit,
  ...props
}: FormProps<S>): React.ReactElement => {
  const ctx = useForm<z.infer<S>>({
    mode: 'onBlur',
    resolver: schema
      ? zodResolver(schema, undefined, { mode: 'sync' })
      : undefined,
    defaultValues: initialValues,
  });
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const clearErrors = useCallback((): void => {
    setTimeout(() => {
      ctx.clearErrors();
    });
  }, [ctx]);

  const handleReset = useCallback(() => {
    ctx.reset(initialValues);
    clearErrors();
  }, [ctx, initialValues, clearErrors]);

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    if (clearErrorsFunction) clearErrorsFunction.current = clearErrors;
  }, [clearErrors, clearErrorsFunction]);

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(async values => {
          const result = await onSubmit(values);
          Object.entries(result ?? {}).forEach(([key, value]) => {
            if (key === FORM_ERROR) {
              setFormError(value);
            } else {
              ctx.setError(key as Path<TypeOf<S>>, {
                type: 'submit',
                message: value,
              });
            }
          });

          if (!result) {
            setTimeout(() => {
              handleReset();
            }, submitResetTimeout);
          }
        })}
        {...props}
      >
        {formError && (
          <Alert className='my-4' type='error'>
            {formError}
          </Alert>
        )}

        {/* Form fields supplied as children are rendered here */}
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
