import { CompanyStatus } from '@prisma/client';
import { BaseInterface } from './base-interface';


export interface Company extends BaseInterface {
    id: number;
    name: string;
    contactPersonName: string;
    address?: string ;
    contactNumber?: string | null;
    contactEmail?: string | null;
    status: CompanyStatus;
}

export interface CreateCompanyFormData {
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    address?: string;
    status: 'Enable' | 'Disable';
}