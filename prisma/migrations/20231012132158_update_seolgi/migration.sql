/*
  Warnings:

  - You are about to drop the column `dailyAttendanceId` on the `Seolgi` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seolgi" DROP CONSTRAINT "Seolgi_dailyAttendanceId_fkey";

-- AlterTable
ALTER TABLE "Seolgi" DROP COLUMN "dailyAttendanceId";
