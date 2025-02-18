"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { AdvanceColumnFilter } from "@/lib/interfaces/data-table-interfaces";
import { Input } from "@/components/ui/input";
import { WorkGroupSelect } from "./work-group-select";
import { ReportStatusSelector } from "./report-status-selector";
import { Button } from "@/components/ui/button";
import { WorkGroup } from "@/lib/interfaces/work-group-interface";

interface ReportFiltersProps {
    onFiltersChange: (filters: AdvanceColumnFilter[]) => void;
    isStatusFilter?: boolean //status filter select issue in drawer not fixed
}

export default function ReportFilters({
    onFiltersChange, isStatusFilter
}: ReportFiltersProps) {
    const [nameFilter, setNameFilter] = useState<string>('');
    const [selectedWgId, setSelectedWgId] = useState<number>();
    const [wgFilter, setWgFilter] = useState<WorkGroup>();
    const [stetusFilter, setStatusFilter] = useState<AdvanceColumnFilter | undefined>(undefined);

    useEffect(() => {
        const filters: AdvanceColumnFilter[] = [];
        if (nameFilter) filters.push({ id: "name", value: nameFilter, condition: 'contains' } as AdvanceColumnFilter);
        if (wgFilter) filters.push({ id: "workGroupId", value: !!wgFilter ? +wgFilter.id : null, condition: 'equal' } as AdvanceColumnFilter);
        if (stetusFilter) filters.push(stetusFilter);
        onFiltersChange(filters)
    }, [nameFilter, wgFilter, stetusFilter]);

    const clearFilters = ()=>{
        setNameFilter('');
        setWgFilter(undefined);
        setStatusFilter(undefined);
        setSelectedWgId(0);
    }

    const onWgSelect = (workGroup: WorkGroup) => {
        setWgFilter(workGroup);
        setSelectedWgId(workGroup.id)
    }


    return (
        <>
            <div className="bg-background/95 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                {/* <form> */}
                    <div className="flex flex-row gap-3">
                        <div className="justify-start">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" value={nameFilter} onChange={(e) => { setNameFilter( e.target.value) }} className="pl-8" />
                            </div>
                        </div>
                        <div className="">
                            <WorkGroupSelect
                                onSelect={(workgroup) => onWgSelect(workgroup)}
                                selectedId={selectedWgId}
                                disabled={false}
                            />
                        </div>
                        <div className=" ">
                            {
                                isStatusFilter &&
                                <ReportStatusSelector onChange={(status => setStatusFilter({ id: "status", value: status, condition: 'equal' }))} title="Status"></ReportStatusSelector>
                            }
                         </div>
                        <div className="">
                            { (
                                <Button
                                    variant="ghost"
                                    onClick={() => clearFilters()}
                                    className=""
                                >
                                    Reset
                                    <X />
                                </Button>
                            )}
                        </div>
                    </div>
                {/* </form> */}
            </div>
        </>
    );
}