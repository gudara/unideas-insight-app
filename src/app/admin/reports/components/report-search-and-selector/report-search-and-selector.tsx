'use client'
import RsasFilters from "./rsas-filters";
import { AdvanceColumnFilter } from "@/lib/interfaces/data-table-interfaces";

interface ReportSearchAndSelectorProps {
    selectedReports?: Report[];
    reportList: Report[];
    onFiltersChange: (filters: AdvanceColumnFilter[]) => void;
}

export const ReportSearchAndSelector: React.FC<ReportSearchAndSelectorProps> = (
    { 
        selectedReports, 
        reportList,
        onFiltersChange
    }
) => {

    function changeFilters(filters: AdvanceColumnFilter[]): void {
        onFiltersChange(filters)
    }

    return (
        <>
            <div className="w-full">
                <RsasFilters onFiltersChange={(filters)=>changeFilters(filters)} />
            </div>
        </>
    )
}