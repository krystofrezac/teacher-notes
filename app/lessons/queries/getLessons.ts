import { resolver } from '@blitzjs/rpc';
import { paginate } from 'blitz';
import db, { Prisma } from 'db';

interface GetLessonsInput
  extends Pick<
    Prisma.LessonFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {
  include?: { student?: boolean };
}

export default resolver.pipe(
  resolver.authorize<GetLessonsInput>(),
  async ({ where, orderBy, skip = 0, take = 250, include }, ctx) => {
    const whereWithUser: Prisma.LessonWhereInput = {
      ...where,
      student: { userId: ctx.session.userId },
    };

    const {
      items: lessons,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.lesson.count({ where: whereWithUser }),
      query: paginateArgs =>
        db.lesson.findMany({
          ...paginateArgs,
          where: whereWithUser,
          orderBy,
          include: {
            student: include?.student,
          },
        }),
    });

    return {
      lessons,
      nextPage,
      hasMore,
      count,
    };
  },
);
