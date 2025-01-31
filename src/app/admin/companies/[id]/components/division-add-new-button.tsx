"use client"

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { Company } from "@/lib/interfaces/company-interfaces";

interface DivisionAddNewButtonProps {
    company: Company;
}

export const DivisionAddNewButton: React.FC<DivisionAddNewButtonProps> = ({ company }) => {
    // const company = (await params).company;
    const route = useRouter()

    return (
        <Button variant="outline" size="sm" onClick={() => { route.push(`/admin/companies/${company?.id}/divisions/create`) }}>
            <Plus /> Add New
        </Button>
    )
}