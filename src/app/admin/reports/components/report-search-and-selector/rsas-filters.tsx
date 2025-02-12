"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { AdvanceColumnFilter } from "@/lib/interfaces/data-table-interfaces";
import { Input } from "@/components/ui/input";
import { WorkGroupSelect } from "../work-group-select";
import { ReportStatusSelector } from "../report-status-selector";
import { useDebounce } from "@/hooks/use-debounce";

interface RsasFiltersProps {
    onFiltersChange: (filters: AdvanceColumnFilter[]) => void;
}

export default function RsasFilters({
    onFiltersChange
}: RsasFiltersProps) {
    const [nameFilter, setNameFilter] = useState<AdvanceColumnFilter | undefined>(undefined);
    const [wgFilter, setWgFilter] = useState<AdvanceColumnFilter | undefined>(undefined);
    const [stetusFilter, setStatusFilter] = useState<AdvanceColumnFilter | undefined>(undefined);

    const debouncedNameFilter = useDebounce(nameFilter, 100);
    const debouncedWgFilter = useDebounce(wgFilter, 100);
    const debouncedStetusFilter = useDebounce(stetusFilter, 100);

    useEffect(() => {
        const filters: AdvanceColumnFilter[] = [];
        if(debouncedNameFilter)  filters.push(debouncedNameFilter);
        if(debouncedWgFilter) filters.push(debouncedWgFilter);
        if(debouncedStetusFilter) filters.push(debouncedStetusFilter);
        onFiltersChange(filters)
    }, [debouncedNameFilter, debouncedWgFilter]);


    return (
        <>
            <div className="bg-background/95 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                    <div className="flex flex-row gap-3">
                        <div className="justify-start">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" onChange={(e) => { setNameFilter({ id: "name", value: e.target.value, condition: 'contains' }) }} className="pl-8" />
                            </div>
                        </div>
                        <div className="">
                            <WorkGroupSelect
                                onSelect={(workgroup) => setWgFilter({ id: "workGroupId", value: +workgroup.id, condition: 'equal' })}
                                selectedId={null}
                                disabled={false}
                            />
                        </div>
                        <div className=" ">
                            <ReportStatusSelector onChange={(status => setStatusFilter({ id: "status", value: status, condition: 'equal' }))} title="Status"></ReportStatusSelector>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}