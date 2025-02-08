'use client'

import { search } from "@/db-operations/division";
import { Company } from "@/lib/interfaces/company-interfaces";
import { DataTableFilter } from "@/lib/interfaces/data-table-interfaces";
import { Division } from "@/lib/interfaces/division-interfaces";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface DivisionListProps {
    company: Company;
}

export const DivisionList: React.FC<DivisionListProps> = ({ company }) => {

    const filters: DataTableFilter = {
        sorting: [{ id: 'name', desc: false }],
        columnFilters: [{ id: 'companyId', value: company.id }],
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
            return d?.data?.length ? d : { total: 0, data: [], error: null };
        },
    })

    return (
        <>
            <div className="flex flex-col gap-2 p-4 pt-0">
                {
                    data.data?.map((item) => (
                        <button
                            key={item.id}
                            className={cn(
                                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                true && "bg-muted"
                            )}

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
                                        lksafdlsf
                                    </div>
                                </div>
                                <div className="text-xs font-medium">Sub title hear</div>
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                description hear
                            </div>

                        </button>
                    ))
                }
            </div>
        </>
    )

}