import PageHeader from '@/components/page-header';
import { Suspense } from 'react';
import Loading from './loading';
import { DivisionDraftForm } from './forms/division-draft-form';
import { Division } from '@/lib/interfaces/division-interfaces';
import { get } from '@/db-operations/company';

const CreateDivisionPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    
    const division: Division | null = null;
    const company = await get(+(await params).id);

    const header =  `Create a new division`;
    const description =  `Register a new division for ${company.name}`;
    return (
        <Suspense fallback={<Loading />}>
            <PageHeader header={header} description={description} />
            <DivisionDraftForm company={company} division={division} />
        </ Suspense>
    )
}

export default CreateDivisionPage;

