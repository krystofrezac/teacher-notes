import { resolver } from '@blitzjs/rpc';
import { NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetLesson = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(GetLesson),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const lesson = await db.lesson.findFirst({
      where: { id, student: { userId: ctx.session.userId } },
    });

    if (!lesson) throw new NotFoundError();

    return lesson;
  },
);
