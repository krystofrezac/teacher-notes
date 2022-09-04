import { z } from 'zod';

import LessonFilter from '../validations/lessonFilter';

type LessonFilterFormValues = z.infer<typeof LessonFilter>;
export type LessonFilterFormSubmitHandler = (
  values: LessonFilterFormValues,
) => void;

export interface LessonFilterFormProps {
  open: boolean;
  initialValues?: LessonFilterFormValues;

  onSubmit: LessonFilterFormSubmitHandler;
  onClear: () => void;
  onClose: () => void;
}
