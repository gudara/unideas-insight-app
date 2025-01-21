import { CompanyStatus } from '@prisma/client';

export interface Company {
    id: number;
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    status: CompanyStatus;
}

export interface CreateCompanyFormData {
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    status: 'Enable' | 'Disable';
}