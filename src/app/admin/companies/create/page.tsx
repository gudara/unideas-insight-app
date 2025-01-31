'use client';

import { CompanyDraftForm } from '@/app/admin/companies/create/forms/company-draft-form';
import { Company } from '@/lib/interfaces/company-interfaces';
import PageHeader from '@/components/page-header';
import { Suspense } from 'react';
import Loading from './loading';

export default function CreateCompanyPage() {
    const company: Company | null = null;

    const header =  'Create a new company';
    const description =  'Register a new company';
    return (
        <Suspense fallback={<Loading />}>
            <PageHeader header={header} description={description} />
            <CompanyDraftForm company={company} />
        </ Suspense>
    )
}



