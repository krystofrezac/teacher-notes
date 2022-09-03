import { z } from 'zod';

import Lesson from '../validations/lesson';

export type LessonFormValues = z.infer<typeof Lesson>;
export type LessonFormSubmitHandler = (
  values: LessonFormValues,
) => Promise<void>;

interface InitialValues {
  date: string;
  description: string;
}

export interface LessonFormProps {
  open: boolean;
  initialValues?: InitialValues;
  submitText: string;

  onSubmit: LessonFormSubmitHandler;
  onClose: () => void;
}
