import { Company } from "./interfaces";
import { getCompanies } from "@/db-operations/company";
import { DataTableCompanies } from "./table-companies/data-table-companies";
import { columns } from "./table-companies/components/dt-compaies-columns";

export default async function CompaniesPage() {
    const items: Company[] = await getCompanies();

    return (
      <div className="container mx-auto py-10">
        <DataTableCompanies columns={columns} data={items} />
      </div>
    )
}
