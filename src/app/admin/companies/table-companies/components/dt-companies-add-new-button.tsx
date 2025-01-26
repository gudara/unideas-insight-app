"use client"

import { Table } from "@tanstack/react-table"
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface DtCompaniesAddNewButtonProps<TData> {
    table: Table<TData>
}

export function DtCompaniesAddNewButton<TData>({
    table,
}: DtCompaniesAddNewButtonProps<TData>) {
    const route = useRouter()
    return (
        <Button variant="outline" onClick={()=>{ route.push('/admin/companies/create')}}>
            <Plus /> Add New
        </Button>
    )
}