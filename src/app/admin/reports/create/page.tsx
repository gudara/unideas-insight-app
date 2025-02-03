import PageHeader from '@/components/page-header';
import { Suspense } from 'react';
import LoadingComponent from './loading';
import { ReportDraftForm } from './form/report-draft-form';
import { DataTableFilter } from '@/lib/interfaces/data-table-interfaces';
import { search } from '@/db-operations/work-group';

export default async function CreateCompanyPage() {
    const draft: Report | null = null;

    const filters: DataTableFilter = {
        sorting: [{ id: 'name', desc: false }],
        columnFilters: [{ id: 'status', value: 'Enable' }],
        pagination: { pageIndex: 0, pageSize: 200 }
    }

    const wgSearch = await search(filters)

    const header =  'Create a new report';
    const description =  'Register and configure a new Powerbi reports hear';
    return (
        <Suspense fallback={<LoadingComponent />}>
            <PageHeader header={header} description={description} />
            <ReportDraftForm report={draft} workGroups={wgSearch.data} />
        </ Suspense>
    )
}



