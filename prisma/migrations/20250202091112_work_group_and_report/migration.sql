-- CreateEnum
CREATE TYPE "WorkGroupStatus" AS ENUM ('Enable', 'Disable');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('Enable', 'Disable');

-- CreateTable
CREATE TABLE "WorkGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "createdBy" VARCHAR(50) NOT NULL,
    "lastUpdatedBy" VARCHAR(50),
    "status" "WorkGroupStatus" NOT NULL DEFAULT 'Enable',

    CONSTRAINT "WorkGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(200),
    "reportId" VARCHAR(50) NOT NULL,
    "workspaceId" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "createdBy" VARCHAR(50) NOT NULL,
    "lastUpdatedBy" VARCHAR(50),
    "status" "ReportStatus" NOT NULL DEFAULT 'Enable',

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkGroup_name_key" ON "WorkGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Report_name_key" ON "Report"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Report_reportId_key" ON "Report"("reportId");
