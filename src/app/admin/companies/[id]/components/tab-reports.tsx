'use client'
import { Company } from "@/lib/interfaces/company-interfaces";
import { WorkGroup } from "@/lib/interfaces/work-group-interface";
import { AssignReportToCompany } from "./assign-report-to-company";
import { ReportSearchAndSelector } from "@/app/admin/reports/components/report-search-and-selector/report-search-and-selector";
import { AdvanceColumnFilter } from "@/lib/interfaces/data-table-interfaces";

interface TabReportsProps {
    company: Company;
}

export const TabReports: React.FC<TabReportsProps> = ({ company }) => {

    function wgSelected(workgroup: WorkGroup): void {
        throw new Error("Function not implemented.");
    }

    function changeFilters(filters: AdvanceColumnFilter[]): void {
        // console.log(filters)
    }

    return (
        <>
            <div className="w-full">
                <AssignReportToCompany company={company}></AssignReportToCompany>
            </div>
            <div className="w-full">
                <ReportSearchAndSelector onFiltersChange={(filters=> changeFilters(filters))} list={[]} />
            </div>
        </>
    )
}