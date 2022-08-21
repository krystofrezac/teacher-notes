import z from 'zod';

import Student from '../validations/students';

type StudentFormValues = z.infer<typeof Student>;
export type StudentFormSubmitHandler = (
  values: StudentFormValues,
) => Promise<void>;

export interface StudentFormProps {
  open: boolean;

  onSubmit: StudentFormSubmitHandler;
  onClose: () => void;
}
