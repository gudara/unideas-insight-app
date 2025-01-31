import { DivisionStatus } from "@prisma/client";
import { BaseInterface } from "./base-interface";
import { Company } from "./company-interfaces";

export interface Division extends BaseInterface {
    id: number;
    companyId: number;
    name: string;
    contactPersonName: string;
    address?: string | null;
    contactNumber?: string | null;
    contactEmail?: string | null;
    status: DivisionStatus;
    company?: Company
}

export interface CreateDivisionFormData {
    name: string;
    contactPersonName: string;
    address?: string;
    contactNumber?: string;
    contactEmail: string;
    status: 'Enable' | 'Disable';
}