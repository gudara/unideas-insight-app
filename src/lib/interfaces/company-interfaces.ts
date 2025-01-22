import { CompanyStatus } from '@prisma/client';

interface BaseInterface {
    createdAt: Date;
    lastUpdated: Date;
    createdBy: string;
    lastUpdatedBy?: string | null;
}

export interface Company extends BaseInterface {
    id: number;
    name: string;
    contactPersonName: string;
    contactNumber?: string | null;
    contactEmail?: string | null;
    status: CompanyStatus;
}

export interface CreateCompanyFormData {
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    status: 'Enable' | 'Disable';
}