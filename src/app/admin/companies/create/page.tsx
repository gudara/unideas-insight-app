'use client';

import { CompanyDraftForm } from '../forms/company-draft-form';
import { Company } from '../../../../lib/interfaces/company-interfaces';
import PageHeader from '@/components/page-header';

export default function CreateCompanyPage() {
    let company: Company | null = null;

    let header = company ? `Update company ${company.name}` : 'Create a new company';
    let description = company ? 'Update registerd company details' : 'Register a new company';
    return (
        <>
            <PageHeader header={header} description={description} />
            <CompanyDraftForm company={company} />
        </>
    )
}



