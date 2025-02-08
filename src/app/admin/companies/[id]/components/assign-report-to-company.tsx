"use client"

import { FilePlus2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { Company } from "@/lib/interfaces/company-interfaces";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReportSearchAndSelector } from "@/app/admin/reports/components/report-search-and-selector/report-search-and-selector";

interface AssignReportToCompanyProps {
    company: Company;
}

export const AssignReportToCompany: React.FC<AssignReportToCompanyProps> = ({ company }) => {
    // const company = (await params).company;
    // const route = useRouter()

    return (
        <>
            <ReportSearchAndSelector selectedReports={[]} reportList={[]} onFiltersChange={(filters) => { }} />


        </>
    )
}