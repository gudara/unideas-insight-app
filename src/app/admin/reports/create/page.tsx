import PageHeader from '@/components/page-header';
import { Suspense } from 'react';
import LoadingComponent from './loading';
import { ReportDraftForm } from './form/report-draft-form';

export default function CreateCompanyPage() {
    const draft: Report | null = null;

    const header =  'Create a new report';
    const description =  'Register and configure a new Powerbi reports hear';
    return (
        <Suspense fallback={<LoadingComponent />}>
            <PageHeader header={header} description={description} />
            <ReportDraftForm report={draft} />
        </ Suspense>
    )
}



