/*
  Warnings:

  - You are about to drop the column `lastModifiedDate` on the `Objective` table. All the data in the column will be lost.
  - The `status` column on the `Objective` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ObjectHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stamp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StampStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Objective` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ObjectiveStatus" AS ENUM ('COMPLETED', 'ACTIVE', 'FAILED');

-- CreateEnum
CREATE TYPE "ObjectiveHistoryType" AS ENUM ('CREATED', 'MODIFIED', 'DELETED');

-- CreateEnum
CREATE TYPE "DailyAttendanceType" AS ENUM ('PRESENT', 'ABSENT');

-- DropForeignKey
ALTER TABLE "Stamp" DROP CONSTRAINT "Stamp_objectiveId_fkey";

-- DropForeignKey
ALTER TABLE "StampStatus" DROP CONSTRAINT "StampStatus_objectiveId_fkey";

-- AlterTable
ALTER TABLE "Objective" DROP COLUMN "lastModifiedDate",
ADD COLUMN     "failedAt" TIMESTAMP(3),
ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ObjectiveStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "ObjectHistory";

-- DropTable
DROP TABLE "Stamp";

-- DropTable
DROP TABLE "StampStatus";

-- DropEnum
DROP TYPE "ObjectHistoryType";

-- DropEnum
DROP TYPE "ObjectStatus";

-- CreateTable
CREATE TABLE "ObjectiveHistory" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "changedType" "ObjectiveHistoryType" NOT NULL,
    "oldValue" TEXT NOT NULL,
    "newValue" TEXT NOT NULL,
    "objectiveId" INTEGER NOT NULL,

    CONSTRAINT "ObjectiveHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyAttendance" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "DailyAttendanceType" NOT NULL,
    "objectiveId" INTEGER,

    CONSTRAINT "DailyAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seolgi" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "objectiveId" INTEGER,

    CONSTRAINT "Seolgi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ObjectiveHistory" ADD CONSTRAINT "ObjectiveHistory_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyAttendance" ADD CONSTRAINT "DailyAttendance_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seolgi" ADD CONSTRAINT "Seolgi_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective"("id") ON DELETE SET NULL ON UPDATE CASCADE;
