import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const UpdateStudent = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateStudent),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const student = await db.student.updateMany({
      where: { id, userId: ctx.session.userId },
      data,
    });

    return student;
  },
);
