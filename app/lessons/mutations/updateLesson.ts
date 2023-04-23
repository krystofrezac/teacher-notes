import { resolver } from '@blitzjs/rpc';
import { NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const UpdateLesson = z.object({
  id: z.number(),
  date: z.date(),
  description: z.string(),
  tagIds: z.array(z.number()),
});

export default resolver.pipe(
  resolver.zod(UpdateLesson),
  resolver.authorize(),
  async ({ id, date, description, tagIds: tagsOnLessons }, ctx) => {
    const lesson = await db.lesson.findFirst({
      where: { id, student: { userId: ctx.session.userId } },
      include: { TagsOnLessons: true },
    });

    if (!lesson) throw new NotFoundError();

    const tagsToAdd = tagsOnLessons.filter(
      tagId =>
        !lesson.TagsOnLessons.find(
          tagOnLessons => tagOnLessons.tagId === tagId,
        ),
    );
    const tagsToDelete = lesson.TagsOnLessons.filter(
      tag => !tagsOnLessons.find(tagId => tag.tagId === tagId),
    );

    const updateLesson = await db.lesson.update({
      where: { id: lesson?.id },
      data: {
        date,
        description,
        TagsOnLessons: {
          createMany: { data: tagsToAdd.map(tagId => ({ tagId })) },
          deleteMany: tagsToDelete.map(tag => ({ id: tag.id })),
        },
      },
    });

    return updateLesson;
  },
);
