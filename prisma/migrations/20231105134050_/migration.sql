-- AlterTable
ALTER TABLE "Objective" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Seolgi" ADD COLUMN     "bgFill" TEXT,
ADD COLUMN     "blushFill" TEXT;
