"use client";

import { useState, useEffect, FocusEvent, useRef } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { WorkGroup } from "@/lib/interfaces/work-group-interface";
import { DataTableFilter } from "@/lib/interfaces/data-table-interfaces";
import { search } from '@/db-operations/work-group'
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { WorkGroupStatus } from "@prisma/client";

export function WorkGroupSelect({
    onSelect,
    selectedId,
    disabled,
}: {
    onSelect: (workgroup: WorkGroup) => void;
    selectedId?: number | null;
    disabled?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [workgroups, setWorkgroups] = useState<WorkGroup[]>([]);
    const [selectedWorkGroup, setSelectedWorkgroup] = useState<WorkGroup | null>(null);

    useEffect(() => {
        // Fetch workgroups 
        const fetchWorkgroups = async () => {
            const filters: DataTableFilter = {
                sorting: [{ id: 'name', desc: false }],
                columnFilters: [{ id: 'status', value: WorkGroupStatus.Enable, condition: 'equal' }, { id: 'name', value: searchString }],
                pagination: { pageIndex: 0, pageSize: 200 }
            }
            const wgSearch = await search(filters)
            setWorkgroups(wgSearch.data);
        };
        fetchWorkgroups();
    }, [searchString]);

    useEffect(() => {
        if (selectedId && selectedId !== selectedWorkGroup?.id) {
            const selected = workgroups.find((wg) => wg.id === selectedId);
            if (selected) setSelectedWorkgroup(selected);
        }
    }, [selectedId, workgroups]);



    return (
        <>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        size="default"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between",
                            disabled && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={disabled}
                    >
                        <>
                            {selectedWorkGroup ? selectedWorkGroup.name : <span className="text-muted-foreground">Select a work group</span>}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </>
                    </Button>

                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                        <CommandInput
                            placeholder="Search workgroup"
                            value={searchString}
                            onValueChange={setSearchString}
                        />
                        <CommandEmpty>No workgroup found.</CommandEmpty>
                        <CommandGroup>
                            {workgroups.map((workgroup) => (
                                <CommandItem
                                    key={workgroup.id}
                                    value={workgroup.name}
                                    onSelect={() => {
                                        setSelectedWorkgroup(workgroup);
                                        onSelect(workgroup);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${selectedWorkGroup?.id === workgroup.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />
                                    {workgroup.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}