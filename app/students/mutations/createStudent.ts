import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const CreateStudent = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateStudent),
  resolver.authorize(),
  async (input, ctx) => {
    const student = await db.student.create({
      data: { ...input, userId: ctx.session.userId },
    });

    return student;
  },
);
