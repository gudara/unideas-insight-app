"use client";

import { useState, useEffect } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
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
import { WorkGroupStatus } from "@prisma/client";
import DynamicIcon from "@/components/dynamic-icon";

export function WorkGroupSelect({
    onSelect,
    disabled,
    selectedId
}: {
    onSelect: (workgroup: WorkGroup) => void;
    disabled?: boolean;
    selectedId?: number | null | undefined;
}) {
    const [open, setOpen] = useState(false);
    const [workgroups, setWorkgroups] = useState<WorkGroup[]>([]);
    const [selectedWorkGroup, setSelectedWorkgroup] = useState<WorkGroup | null>(null);

    useEffect(() => {
        // Fetch workgroups 
        const fetchWorkgroups = async () => {
            const filters: DataTableFilter = {
                sorting: [{ id: 'name', desc: false }],
                columnFilters: [{ id: 'status', value: WorkGroupStatus.Enable, condition: 'equal' }],
                pagination: { pageIndex: 0, pageSize: 200 }
            }
            const wgSearch = await search(filters)
            setWorkgroups(wgSearch.data);
        };
        fetchWorkgroups();
    }, []);

    useEffect(() =>{
        if(selectedId && workgroups.length){
            const sel = workgroups.find(a=> a.id === selectedId);
            setSelectedWorkgroup(sel ? sel : null)
        }
        else{
            setSelectedWorkgroup(null)   
        }
    }, [workgroups, selectedId])

    return (
        <>
            <Popover open={open} onOpenChange={setOpen} >
                <PopoverTrigger asChild>
                    <Button
                        onPointerDown={(e) => e.stopPropagation()}
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
                        <div className="flex flex-row justify-start">
                            {selectedWorkGroup ? <DynamicIcon iconName={selectedWorkGroup?.icon as any} size={14} className="mr-1" /> : ''}
                            {selectedWorkGroup ? selectedWorkGroup.name : <span className="text-muted-foreground">Select a work group</span>}
                        </div>
                        <div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </div>
                    </Button>

                </PopoverTrigger>
                <PopoverContent className="w-full p-0 z-[1000] pointer-events-auto">
                    <Command className="w-full [&>*]:pointer-events-auto">
                        {/* <CommandInput
                            onFocus={(e) => e.stopPropagation()}
                            placeholder="Search workgroup"
                            value={searchString}
                            onValueChange={setSearchString}
                            onPointerDown={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                            className="focus-visible:ring-0"
                        /> */}
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
                                    <DynamicIcon iconName={workgroup.icon as any} size={14} />
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