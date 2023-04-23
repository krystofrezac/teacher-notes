import { z } from 'zod';

const StudentFilter = z.object({
  description: z.string().optional(),
  tags: z.array(z.object({ id: z.number(), title: z.string() })).optional(),
});

export default StudentFilter;
