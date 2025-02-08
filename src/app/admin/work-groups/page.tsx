
import PageHeader from "@/components/page-header";
import { Suspense } from "react";
import { columns } from "./table-work-groups/data-table-work-groups-columns";
import LoadingComponent from "./loading";
import { DataTableWorkGroups } from "./table-work-groups/data-table-work-groups";

export default async function WorkGroupsPage() {

  const header = 'Work Groups';
  const description = 'Managing work group master';
  return (
    <>
      <PageHeader header={header} description={description} />
      <div className="container mx-auto mt-2 pt-2" >
        <Suspense fallback={<LoadingComponent />}>
          <DataTableWorkGroups columns={columns} />
        </Suspense>
      </div>
    </>
  )
}