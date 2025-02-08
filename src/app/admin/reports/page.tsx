
// import { DataTableCompanies } from "./table-companies/data-table-companies";
import { columns } from "./table-reports/data-table-reports-columns";
import PageHeader from "@/components/page-header";
import { Suspense } from "react";
import LoadingComponent from "./loading";
import { DataTableReports } from "./table-reports/data-table-reports";

export default async function ReportsPage() {

  const header = 'Reports ';
  const description = 'Register and maintain Power BI reports';
  return (
    <>
      <PageHeader header={header} description={description} />
      <div className="container mx-auto mt-2 pt-2" >
        <Suspense fallback={<LoadingComponent />}>
          <DataTableReports columns={columns} />
        </Suspense>
      </div>
    </>
  )
}