'use client';

import { CompanyDraftForm } from '../forms/company-draft-form';
import { Company } from '../../../../lib/interfaces/company-interfaces';
import PageHeader from '@/components/page-header';

export default function CreateCompanyPage() {
    const company: Company | null = null;

    const header = company ? `Update company ${company.name}` : 'Create a new company';
    const description = company ? 'Update registerd company details' : 'Register a new company';
    return (
        <>
            <PageHeader header={header} description={description} />
            <CompanyDraftForm company={company} />
        </>
    )
}



