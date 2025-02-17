'use client'

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { search } from "@/db-operations/division";
import { Company } from "@/lib/interfaces/company-interfaces";
import { DataTableFilter } from "@/lib/interfaces/data-table-interfaces";
import { Division } from "@/lib/interfaces/division-interfaces";
import { cn } from "@/lib/utils";
import { DivisionStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone, UserCircle } from "lucide-react";
import React, { useState } from "react";

interface DivisionListProps {
    company: Company;
    searchString?: string;
    onSelectDivision?: (division: Division | undefined) => void
}

export const DivisionList: React.FC<DivisionListProps> = ({ company, searchString, onSelectDivision = () => { } }) => {
    const [selectedId, setSelectedId] = useState(0)

    const filters: DataTableFilter = {
        sorting: [{ id: 'name', desc: false }],
        columnFilters: [{ id: 'companyId', value: company.id, condition: 'equal-number' }, { id: 'name', value: searchString, condition: 'contains' }],
        pagination: { pageIndex: 0, pageSize: 200 }
    }

    const { data = { total: 0, data: [], error: null }, isLoading } = useQuery<{
        total: number;
        data: Division[];
        error?: string | null;
    }>({
        queryKey: ['divisions', company, filters ? { ...filters } : '{}'],
        queryFn: async () => {
            const d = await search({ ...filters })
            // console.log("---", d)
            return d?.data?.length ? d : { total: 0, data: [], error: null };
        },
    })

    return (
        <>
            {
                !isLoading &&
                <div className="flex flex-col p-4 pt-0">
                    {
                        data.data?.map((item) => (
                            <button
                                key={item.id}
                                className={cn(
                                    "flex flex-col items-start gap-0 border-b px-4 py-2 text-left text-sm transition-all hover:bg-accent",
                                    selectedId === item.id && "bg-muted"
                                )}
                                onClick={() => {
                                    setSelectedId(item.id);
                                    onSelectDivision(item)
                                }}
                            >
                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">{item.name}</div>
                                        </div>
                                        <div
                                            className={cn(
                                                "ml-auto text-xs",
                                                ''
                                            )}
                                        >
                                            {item.status === DivisionStatus.Enable && <Badge variant="success" >{item.status}</Badge>}
                                            {item.status === DivisionStatus.Disable && <Badge variant="destructive" >{item.status}</Badge>}
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium">
                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-row"><UserCircle size={12} /> &nbsp; {item.contactPersonName}</div>
                                            <div className="flex flex-row"><Phone size={12} /> &nbsp; {item.contactNumber}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground flex flex-row">
                                    <MapPin size={12} /> &nbsp;{item.address}
                                </div>

                            </button>
                        ))
                    }
                </div>
            }
            {
                isLoading &&

                <div className="flex flex-col p-4 pt-0">
                    {
                        [1, 2, 3, 4, 5, 6].map((item) => (
                            <button
                                key={item}
                                className={cn(
                                    "flex flex-col items-start gap-0 border-b px-4 py-2 text-left text-sm transition-all hover:bg-accent",
                                )}
                            >
                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">
                                                <Skeleton className="h-4 w-[200px] my-2"></Skeleton>
                                            </div>
                                        </div>
                                        <div
                                            className={cn(
                                                "ml-auto text-xs",
                                                ''
                                            )}
                                        >
                                            <Skeleton className="h-3 w-[80px] my-2"></Skeleton>
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium">
                                        <div className="flex flex-row justify-between">
                                            <Skeleton className="h-3 w-[200px] my-0"></Skeleton>
                                            <Skeleton className="h-3 w-[100px] my-0"></Skeleton>
                                        </div>
                                    </div>
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground flex flex-row">
                                    <Skeleton className="h-3 w-[250px] my-1"></Skeleton>
                                </div>

                            </button>
                        ))
                    }
                </div>
            }
        </>
    )

}