import { resolver } from '@blitzjs/rpc';
import { Prisma } from '@prisma/client';
import db from 'db';
import { z } from 'zod';

const CreateLesson = z.object({
  date: z.date(),
  description: z.string(),
  studentId: z.number(),
  tagIds: z.array(z.number()),
});

export default resolver.pipe(
  resolver.zod(CreateLesson),
  resolver.authorize(),
  async input => {
    const { date, description, studentId, tagIds } = input;

    const mappedTags: Prisma.TagsOnLessonsUncheckedCreateWithoutLessonInput[] =
      tagIds.map(tagId => ({ tagId }));

    const lesson = await db.lesson.create({
      data: {
        date,
        description,
        studentId,
        TagsOnLessons: {
          createMany: {
            data: mappedTags,
          },
        },
      },
    });

    return lesson;
  },
);
