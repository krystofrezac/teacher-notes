import { z } from 'zod';

import Lesson from '../validations/lesson';

export type LessonFormValues = z.infer<typeof Lesson>;
export type LessonFormSubmitHandler = (
  values: LessonFormValues,
) => Promise<void>;

export interface LessonFormProps {
  open: boolean;
  initialValues?: LessonFormValues;
  submitText: string;

  onSubmit: LessonFormSubmitHandler;
  onClose: () => void;
}
