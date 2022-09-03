import { z } from 'zod';

const Lesson = z.object({
  date: z.string().min(1, 'Date cannot be empty'),
  description: z.string().min(1),
});

export default Lesson;
