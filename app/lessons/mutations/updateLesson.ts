import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const UpdateLesson = z.object({
  id: z.number(),
  date: z.date(),
});

export default resolver.pipe(
  resolver.zod(UpdateLesson),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const lesson = await db.lesson.updateMany({
      where: { id, student: { userId: ctx.session.userId } },
      data,
    });

    return lesson;
  },
);
