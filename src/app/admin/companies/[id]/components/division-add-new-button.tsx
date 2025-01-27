"use client"

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// interface DtCompaniesAddNewButtonProps<TData> {
//     table: Table<TData>
// }

export function DivisionAddNewButton(
) {
    const route = useRouter()
    return (
        <Button variant="outline" size="sm" onClick={()=>{ route.push('/admin/companies/create')}}>
            <Plus /> Add New
        </Button>
    )
}