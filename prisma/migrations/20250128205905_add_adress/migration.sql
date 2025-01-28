-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "address" VARCHAR(100);

-- CreateTable
CREATE TABLE "Division" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "contactPersonName" VARCHAR(100) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "contactNumber" VARCHAR(20),
    "contactEmail" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "createdBy" VARCHAR(50) NOT NULL,
    "lastUpdatedBy" VARCHAR(50),
    "status" "CompanyStatus" NOT NULL DEFAULT 'Enable',

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Division_name_key" ON "Division"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Division_contactEmail_key" ON "Division"("contactEmail");

-- AddForeignKey
ALTER TABLE "Division" ADD CONSTRAINT "Division_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
