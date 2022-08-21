import { resolver } from '@blitzjs/rpc';
import { paginate } from 'blitz';
import db, { Prisma } from 'db';

interface GetStudentsInput
  extends Pick<
    Prisma.StudentFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetStudentsInput, ctx) => {
    const whereWithUser = { ...where, userId: ctx.session.userId };

    const {
      items: students,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.student.count({ where: whereWithUser }),
      query: paginateArgs =>
        db.student.findMany({ ...paginateArgs, where: whereWithUser, orderBy }),
    });

    return {
      students,
      nextPage,
      hasMore,
      count,
    };
  },
);
