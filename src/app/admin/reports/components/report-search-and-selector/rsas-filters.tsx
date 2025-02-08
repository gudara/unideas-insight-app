"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { AdvanceColumnFilter } from "@/lib/interfaces/data-table-interfaces";
import { Input } from "@/components/ui/input";
import { WorkGroupSelect } from "../work-group-select";
import { ReportStatusSelector } from "../report-status-selector";

interface RsasFiltersProps {
    onFiltersChange: (filters: AdvanceColumnFilter[]) => void;
}

export default function RsasFilters({
    onFiltersChange
}: RsasFiltersProps) {
    const [nameFilter, setNameFilter] = useState<AdvanceColumnFilter | undefined>(undefined);
    const [wgFilter, setWgFilter] = useState<AdvanceColumnFilter | undefined>(undefined);
    const [stetusFilter, setStatusFilter] = useState<AdvanceColumnFilter | undefined>(undefined);

    useEffect(() => {
        const filters: AdvanceColumnFilter[] = [];
        nameFilter ? filters.push(nameFilter) : false;
        wgFilter ? filters.push(wgFilter) : false;
        stetusFilter ? filters.push(stetusFilter) : false;
        onFiltersChange(filters)
    }, [nameFilter, wgFilter, stetusFilter]);

    function searchReportName(value: string) {
        if (value) {
            setNameFilter({ id: "name", value, condition: 'contains' })
        }
        else {
            setNameFilter(undefined)
        }
    }

    function changeWorkGroup(value: number) {
        if (value) {
            setWgFilter({ id: "workGroupId", value, condition: 'equal' })
        }
        else {
            setWgFilter(undefined)
        }
    }

    function changeStatus(values: any) {
        if (values?.length) {
            setStatusFilter({ id: "status", value: values, condition: 'in' })
        }
        else {
            setStatusFilter(undefined)
        }
    }

    return (
        <>
            <div className="bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                    <div className="flex flex-row gap-3">
                        <div className="justify-start">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" onChange={(e) => { searchReportName(e.target.value) }} className="pl-8" />
                            </div>
                        </div>
                        <div className="justify-start">
                            <WorkGroupSelect
                                onSelect={(workgroup) => changeWorkGroup(+workgroup.id)}
                                selectedId={null}
                                disabled={false}
                                withAddNewButton={false}
                                placeHolderString="Filter by work group"
                            />
                        </div>
                        <div className="justify-start">
                            <ReportStatusSelector onChange={(status => changeStatus(status))} title="Status"></ReportStatusSelector>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}