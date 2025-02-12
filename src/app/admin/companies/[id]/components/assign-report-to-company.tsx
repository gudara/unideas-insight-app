"use client"

import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Company } from "@/lib/interfaces/company-interfaces";
import { ReportSearchAndSelector } from "@/app/admin/reports/components/report-search-and-selector/report-search-and-selector";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Report } from "@/lib/interfaces/report-interface";
import { useQuery } from "@tanstack/react-query";
import { getAllEnabled } from "@/db-operations/reports";
import { ListReports } from "@/app/admin/reports/list-reports/list-reports";
import { AdvanceColumnFilter } from "@/lib/interfaces/data-table-interfaces";
import {  useEffect, useMemo, useState } from "react";
import { filterListOfObjects } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

interface AssignReportToCompanyProps {
    company: Company;
    selectedList: Report[];
}

export const AssignReportToCompany: React.FC<AssignReportToCompanyProps> = ({ company, selectedList }) => {
    // const [filterdList, setFilterdList] = useState<Report[]>([]);
    const [advanceFilters, setAdvanceFilters] = useState<AdvanceColumnFilter[]>([]);
    // const [debouncedFilters, setDebouncedFilters] = useState<AdvanceColumnFilter[]>(advanceFilters);
    const debouncedFilters = useDebounce(advanceFilters, 100)

    // useEffect(() => {
    //   const handler = setTimeout(() => {
    //     setDebouncedFilters(advanceFilters);
    //   }, 500); // Adjust debounce time as necessary
  
    //   return () => {
    //     clearTimeout(handler); // Cleanup on unmount
    //   };
    // }, [advanceFilters]);
  

    const { data, isLoading } = useQuery<Report[]>({
        queryKey: ['all-reports'],
        queryFn: async () => {
            const d = await getAllEnabled();
            if (Array.isArray(d)) {
                // d?.map(a => {
                //     const find = selectedList?.findIndex(b => b.id === a.id);
                //     return { ...a, isSelected: find > -1 }
                // })
                return d
            }
            return [];
        },
    })

    const filterdList = useMemo(() => {
        if (!data ) return [];
        if (!debouncedFilters ) return data;
        return filterListOfObjects(data as Report[], advanceFilters)
      }, [data, debouncedFilters]); // Recompute filteredReports only when data or filter changes

    // const filterdList = filterListOfObjects(list as Report[], advanceFilters)

    // function filter(filters: AdvanceColumnFilter[]) {
    //     if (filters.length > 0){
    //         console.log("___________________________", filters)
    //         setFilterdList(filterListOfObjects(list as Report[], filters))
    //     }
            
    // }

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    {/* <span
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    >
                        <FilePlus2 /> Assign Reports
                    </span> */}
                    <Button><FilePlus2 /> Assign Reports</Button>
                </DrawerTrigger>
                <DrawerContent className="z-[500]">
                    <DrawerHeader>
                        <DrawerTitle>Assign Reports</DrawerTitle>
                        <DrawerDescription>Select Reports to assign to the company.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex flex-col">
                            <div>
                                <ReportSearchAndSelector selectedList={[]} list={[]} onFiltersChange={(filters) => { setAdvanceFilters(filters) }} />
                            </div>
                            <div>
                                {
                                    filterdList && <ListReports list={filterdList} />
                                }
                            </div>
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {/* <Button><FilePlus2 /> Assign Reports</Button> */}
        </>
    )
}