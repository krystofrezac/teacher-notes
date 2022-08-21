import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const DeleteStudent = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteStudent),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const student = await db.student.deleteMany({
      where: { id, userId: ctx.session.userId },
    });

    return student;
  },
);
