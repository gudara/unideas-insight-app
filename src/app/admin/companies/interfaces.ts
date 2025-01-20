export interface Company {
    id: number;
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    status: 'Enable' | 'Disable';
}

export interface CreateCompanyFormData {
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    status: 'Enable' | 'Disable';
}