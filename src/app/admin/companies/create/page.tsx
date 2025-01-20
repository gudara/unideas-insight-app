'use client';

import { Company } from '../interfaces';
import { CompanyDraftForm } from '../forms/company-draft-form';

export default function CreateCompanyPage() {
    let company: Company | null = null;

    return (
        <CompanyDraftForm company={company} />
    )
}



