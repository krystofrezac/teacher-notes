import { z } from 'zod';

const Lesson = z.object({
  date: z.string().min(1, 'Date cannot be empty'),
});

export default Lesson;
