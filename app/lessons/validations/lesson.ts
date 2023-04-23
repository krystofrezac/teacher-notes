import { z } from 'zod';

const Lesson = z.object({
  date: z.string().min(1, 'Date cannot be empty'),
  description: z.string().min(1),
  tags: z.array(z.object({ id: z.number(), title: z.string() })),
});

export default Lesson;
