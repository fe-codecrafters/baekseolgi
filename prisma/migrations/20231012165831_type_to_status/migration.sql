/*
  Warnings:

  - You are about to drop the column `type` on the `DailyAttendance` table. All the data in the column will be lost.
  - Added the required column `status` to the `DailyAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DailyAttendanceStatus" AS ENUM ('PRESENT', 'ABSENT');

-- AlterTable
ALTER TABLE "DailyAttendance" DROP COLUMN "type",
ADD COLUMN     "status" "DailyAttendanceStatus" NOT NULL;

-- DropEnum
DROP TYPE "DailyAttendanceType";
