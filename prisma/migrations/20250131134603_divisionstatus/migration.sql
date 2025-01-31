/*
  Warnings:

  - The `status` column on the `Division` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DivisionStatus" AS ENUM ('Enable', 'Disable');

-- AlterTable
ALTER TABLE "Division" DROP COLUMN "status",
ADD COLUMN     "status" "DivisionStatus" NOT NULL DEFAULT 'Enable';
