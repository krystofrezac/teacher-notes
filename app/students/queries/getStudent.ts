import { resolver } from '@blitzjs/rpc';
import { NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetStudent = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(GetStudent),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const student = await db.student.findFirst({
      where: { id, userId: ctx.session.userId },
    });

    if (!student) throw new NotFoundError();

    return student;
  },
);
