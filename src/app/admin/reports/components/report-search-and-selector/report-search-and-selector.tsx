'use client'
import RsasFilters from "./rsas-filters";
import { AdvanceColumnFilter } from "@/lib/interfaces/data-table-interfaces";

interface ReportSearchAndSelectorProps {
    selectedList?: Report[];
    list: Report[];
    onFiltersChange: (filters: AdvanceColumnFilter[]) => void;
}

export const ReportSearchAndSelector: React.FC<ReportSearchAndSelectorProps> = (
    { 
        selectedList: selectedReports, 
        list: reportList,
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