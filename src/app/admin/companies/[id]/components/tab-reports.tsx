'use client'
import { Company } from "@/lib/interfaces/company-interfaces";
import { AssignReportToCompany } from "./assign-report-to-company";
import { useQuery } from "@tanstack/react-query";
import { getCompanyWithReports } from "@/db-operations/company";
import { Skeleton } from "@/components/ui/skeleton";
import { ListReports } from "@/app/admin/reports/list-reports/list-reports";

interface TabReportsProps {
    company: Company;
}

export const TabReports: React.FC<TabReportsProps> = ({ company }) => {

    const { data, isLoading, error } = useQuery<Company, Error>({
        queryKey: ['company-all-reports', company.id],
        queryFn: async () => {
            const d = (await getCompanyWithReports(company.id));
            if (d.data === null || d.data === undefined) {
                throw new Error('Company not found'); // or return a fallback company object
            }
            // console.log("************", d.data)
            return d.data ;
        },
    })


    return (
        <>
            <div className="w-full mb-2 p-2">
                {
                    !isLoading &&
                    <AssignReportToCompany company={company} selectedIdList={data?.reports?.map(r=> r.id) ?? []}></AssignReportToCompany>
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