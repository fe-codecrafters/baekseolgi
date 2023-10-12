/*
  Warnings:

  - Added the required column `seolgiId` to the `DailyAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyAttendance" ADD COLUMN     "seolgiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Seolgi" ADD COLUMN     "dailyAttendanceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Seolgi" ADD CONSTRAINT "Seolgi_dailyAttendanceId_fkey" FOREIGN KEY ("dailyAttendanceId") REFERENCES "DailyAttendance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
