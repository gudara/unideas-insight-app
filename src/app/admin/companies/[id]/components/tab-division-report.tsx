'use client'
import { Company } from "@/lib/interfaces/company-interfaces";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ListReports } from "@/app/admin/reports/list-reports/list-reports";
import { Division } from "@/lib/interfaces/division-interfaces";
import { getDivisionWithReports } from "@/db-operations/division";
import { AssignReportToDivision } from "./assign-report-to-division";

interface TabDivisionReportsProps {
    company: Company;
    division: Division;
}

export const TabDivisionReports: React.FC<TabDivisionReportsProps> = ({ company, division }) => {

    const { data, isLoading, error } = useQuery<Division, Error>({
        queryKey: ['division-all-reports', division],
        queryFn: async () => {
            // if(!division) return undefined
            const d = (await getDivisionWithReports(division?.id));
            if (d.data === null || d.data === undefined) {
                throw new Error('Company not found'); // or return a fallback company object
            }
            // console.log("************", d.data)
            return d.data;
        },
    })


    return (
        <>
            <div className="w-full mb-2 p-2">
                {
                    (!isLoading) &&
                    <AssignReportToDivision division={division} selectedIdList={data?.reports?.map(r => r.id) ?? []}></AssignReportToDivision>
                }
                {
                    isLoading &&
                    <Skeleton className="h-9 w-[150px]" />
                }
            </div>
            <div className="w-full p-2">
                    <ListReports list={data?.reports ?? []} isLoading={isLoading} selectedIdList={[]} enableClickAction={false} />
                
            </div>
        </>
    )
}