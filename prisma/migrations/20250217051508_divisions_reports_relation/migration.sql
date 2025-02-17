-- CreateTable
CREATE TABLE "_DivisionToReport" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DivisionToReport_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DivisionToReport_B_index" ON "_DivisionToReport"("B");

-- AddForeignKey
ALTER TABLE "_DivisionToReport" ADD CONSTRAINT "_DivisionToReport_A_fkey" FOREIGN KEY ("A") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DivisionToReport" ADD CONSTRAINT "_DivisionToReport_B_fkey" FOREIGN KEY ("B") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
