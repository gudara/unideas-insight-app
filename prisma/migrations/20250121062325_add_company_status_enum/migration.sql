-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('Enable', 'Disable');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "status" "CompanyStatus" NOT NULL DEFAULT 'Enable';
