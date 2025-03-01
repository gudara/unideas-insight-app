
import { DataTableCompanies } from "./table-companies/data-table-companies";
import { columns } from "./table-companies/data-table-compaies-columns";
import PageHeader from "@/components/page-header";
import { Suspense } from "react";
import LoadingComponent from "./loading";

export default async function CompaniesPage() {

  const header = 'Companies';
  const description = 'Manage company settings, users, workgroups and set report preferences.';
  return (
    <>
      <PageHeader header={header} description={description} />
      <div className="container mx-auto mt-2 pt-2" >
        <Suspense fallback={<LoadingComponent />}>
          <DataTableCompanies columns={columns} />
        </Suspense>
      </div>
    </>
  )
}