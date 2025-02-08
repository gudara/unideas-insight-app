import PageHeader from '@/components/page-header';
import { Suspense } from 'react';
import LoadingComponent from './loading';
import { WorkGroupDraftForm } from './form/work-group-draft-form';
import { WorkGroup } from '@/lib/interfaces/work-group-interface';

export default function CreateWorkGroupPage() {
    const draft: WorkGroup | null = null;

    const header =  'Create a new report';
    const description =  'Register and configure a new Powerbi reports hear';
    return (
        <Suspense fallback={<LoadingComponent />}>
            <PageHeader header={header} description={description} />
            <WorkGroupDraftForm workGroup={draft} />
        </ Suspense>
    )
}
