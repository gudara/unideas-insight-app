import { DivisionStatus } from "@prisma/client";
import { BaseInterface } from "./base-interface";
import { Company } from "./company-interfaces";
import { Report } from "./report-interface";

export interface Division extends BaseInterface {
    id: number;
    companyId: number;
    name: string;
    contactPersonName: string;
    address?: string | null;
    contactNumber?: string | null;
    contactEmail?: string | null;
    status: DivisionStatus;
    company?: Company;
    reports: Report[] | null;
}

export interface CreateDivisionFormData {
    name: string;
    contactPersonName: string;
    address?: string;
    contactNumber?: string;
    contactEmail: string;
    status: 'Enable' | 'Disable';
}