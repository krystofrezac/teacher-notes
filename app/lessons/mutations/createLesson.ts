import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const CreateLesson = z.object({
  date: z.date(),
  description: z.string(),
  studentId: z.number(),
});

export default resolver.pipe(
  resolver.zod(CreateLesson),
  resolver.authorize(),
  async input => {
    const lesson = await db.lesson.create({ data: input });

    return lesson;
  },
);
