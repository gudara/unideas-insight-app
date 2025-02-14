import { CompanyStatus } from '@prisma/client';
import { BaseInterface } from './base-interface';
import { Report } from './report-interface';


export interface Company extends BaseInterface {
    id: number;
    name: string;
    contactPersonName: string;
    address?: string | null;
    contactNumber?: string | null;
    contactEmail?: string | null;
    status: CompanyStatus;
    reports?: Report[] | null;
}

export interface CreateCompanyFormData {
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    address?: string;
    status: 'Enable' | 'Disable';
}