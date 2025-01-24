
import { DataTableCompanies } from "./table-companies/data-table-companies";
import { columns } from "./table-companies/data-table-compaies-columns";

export default async function CompaniesPage() {
    return (
      <div className="container mx-auto py-2">
        <DataTableCompanies columns={columns} />
      </div>
    )
}