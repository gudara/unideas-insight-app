'use client';

import { CompanyDraftForm } from '../forms/company-draft-form';
import { Company } from '../interfaces';

export default function CreateCompanyPage() {
    let company: Company | null = null;

    return (
        <CompanyDraftForm company={company} />
    )
}



