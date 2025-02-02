"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

interface DtReportsRowActionsProps<TData> {
    row: Row<TData>
}

export function DtReportsRowActions<TData>({
    row,
}: DtReportsRowActionsProps<TData>) {

    const router = useRouter();

    const handleViewAction = () => {
        router.push(`/admin/reports/${row.getValue('id')}`);
    };

    const handleEditAction = () => {
        router.push(`/admin/reports/create}`);
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => { handleEditAction() }}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { handleViewAction() }}>View</DropdownMenuItem>
                <DropdownMenuItem>Disable</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}