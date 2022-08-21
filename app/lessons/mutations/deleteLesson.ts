import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const DeleteLesson = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteLesson),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const lesson = await db.lesson.deleteMany({
      where: { id, student: { userId: ctx.session.userId } },
    });

    return lesson;
  },
);
