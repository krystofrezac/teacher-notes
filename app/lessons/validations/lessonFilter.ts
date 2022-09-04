import { z } from 'zod';

const LessonFilter = z.object({ description: z.string() });

export default LessonFilter;
