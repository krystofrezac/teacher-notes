import { z } from 'zod';

const LessonFilter = z.object({
  description: z.string(),
  tags: z.array(z.object({ id: z.number(), title: z.string() })).optional(),
});

export default LessonFilter;
