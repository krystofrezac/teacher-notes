import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const GetTags = z.object({
  contains: z.string(),
  limit: z.number().optional(),
  excludeIds: z.array(z.number()).optional(),
});

export default resolver.pipe(
  resolver.zod(GetTags),
  resolver.authorize(),
  async ({ contains, limit, excludeIds }, ctx) => {
    return db.tag.findMany({
      where: {
        title: {
          contains,
        },
        id: { notIn: excludeIds },
        user: {
          id: ctx.session.userId,
        },
      },
      take: limit,
    });
  },
);
