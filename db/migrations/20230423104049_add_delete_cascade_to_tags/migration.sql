-- DropForeignKey
ALTER TABLE "TagsOnLessons" DROP CONSTRAINT "TagsOnLessons_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnLessons" DROP CONSTRAINT "TagsOnLessons_tagId_fkey";

-- AddForeignKey
ALTER TABLE "TagsOnLessons" ADD CONSTRAINT "TagsOnLessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnLessons" ADD CONSTRAINT "TagsOnLessons_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
