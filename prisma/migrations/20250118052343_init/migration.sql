/*
  Warnings:

  - Added the required column `createdBy` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdatedBy` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "createdBy" VARCHAR(50) NOT NULL,
ADD COLUMN     "lastUpdatedBy" VARCHAR(50) NOT NULL;
