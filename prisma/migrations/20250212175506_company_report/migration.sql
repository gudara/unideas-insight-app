-- CreateTable
CREATE TABLE "_CompanyToReport" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CompanyToReport_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CompanyToReport_B_index" ON "_CompanyToReport"("B");

-- AddForeignKey
ALTER TABLE "_CompanyToReport" ADD CONSTRAINT "_CompanyToReport_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToReport" ADD CONSTRAINT "_CompanyToReport_B_fkey" FOREIGN KEY ("B") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
