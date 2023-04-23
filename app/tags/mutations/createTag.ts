import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const CreateTag = z.object({
  title: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateTag),
  resolver.authorize(),
  async (input, ctx) => {
    const { title } = input;

    const lesson = await db.tag.create({
      data: {
        title,
        user: { connect: { id: ctx.session.userId } },
      },
    });

    return lesson;
  },
);
