-- This is an empty migration.

ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_studentId_fkey";
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;