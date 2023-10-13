/*
  Warnings:

  - You are about to drop the column `objectiveId` on the `Seolgi` table. All the data in the column will be lost.
  - Made the column `name` on table `Seolgi` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Seolgi" DROP CONSTRAINT "Seolgi_objectiveId_fkey";

-- AlterTable
ALTER TABLE "Seolgi" DROP COLUMN "objectiveId",
ALTER COLUMN "name" SET NOT NULL;
