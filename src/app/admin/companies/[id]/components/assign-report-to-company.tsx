"use client"

import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Company } from "@/lib/interfaces/company-interfaces";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Report } from "@/lib/interfaces/report-interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEnabled } from "@/db-operations/reports";
import { ListReports } from "@/app/admin/reports/list-reports/list-reports";
import { AdvanceColumnFilter } from "@/lib/interfaces/data-table-interfaces";
import { useEffect, useState, useTransition } from "react";
import { filterListOfObjects } from "@/lib/utils";
import ReportFilters from "@/app/admin/reports/components/report-filters/report-filters";
import { updateReports } from "./assign-report-to-company-action";

interface AssignReportToCompanyProps {
    company: Company;
    selectedIdList: number[];
}

export const AssignReportToCompany: React.FC<AssignReportToCompanyProps> = ({ company, selectedIdList }) => {
    const queryClient = useQueryClient();
    const [advanceFilters, setAdvanceFilters] = useState<AdvanceColumnFilter[]>([]);
    const [filterdList, setFilterdList] = useState<Report[]>([]);
    const [isPending, startStatusUpdate] = useTransition();
    const [selectedIdListUpdated, setSelectedIdListUpdated] = useState<number[]>(selectedIdList);

    const { data, isLoading } = useQuery<Report[]>({
        queryKey: ['all-reports'],
        queryFn: async () => {
            return (await getAllEnabled()) ?? [];
            
        },
    })

    useEffect(() => {
        setFilterdList(filterListOfObjects(data as Report[], advanceFilters));
    }, [data, advanceFilters])

    function onSelectTrigger(isSelected: boolean, item: Report): void {
        startStatusUpdate(async () => {
            const da = await updateReports(company.id, isSelected, [item]);
            if(da.data){
                setSelectedIdListUpdated(da.data?.reports?.map(r=> r.id) ?? [])
            }
        });
    }

    return (
        <>
            <Drawer onClose={()=> {
                queryClient.refetchQueries({ queryKey: ['company-all-reports', company.id] })
            }}>
                <DrawerTrigger asChild>
                    <Button><FilePlus2 /> Assign Reports</Button>
                </DrawerTrigger>
                <DrawerContent className="z-[500]">
                    <DrawerHeader>
                        <DrawerTitle>Assign Reports</DrawerTitle>
                        <DrawerDescription>Select Reports to assign to the company.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0 w-full">
                        <div className="flex flex-col w-full content-center justify-center">
                            <div>
                                <ReportFilters onFiltersChange={(filters) => setAdvanceFilters(filters)} ></ReportFilters>
                                {/* <ReportSearchAndSelector selectedList={[]} list={[]} onFiltersChange={(filters) => { setAdvanceFilters(filters) }} /> */}
                            </div>
                            <div>
                                {
                                    filterdList &&
                                    <ListReports
                                        list={filterdList}
                                        selectedIdList={selectedIdListUpdated}
                                        onSelectTrigger={(isSelected, selected) => onSelectTrigger(isSelected, selected)}
                                        isLoading={isLoading} 
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <DrawerFooter>
                        {/* <Button>Submit</Button> */}
                        <DrawerClose asChild>
                            <Button variant="outline">OK</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {/* <Button><FilePlus2 /> Assign Reports</Button> */}
        </>
    )
}