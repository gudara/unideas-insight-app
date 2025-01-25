'use client'
import { Suspense } from 'react';
import LoaderComponent from "@/components/loader-component";
import AdminTasks from "./admin-tasks";
import PageHeader from "@/components/page-header";


export default function AdminPage() {

    let header = 'Administrations';
    let description = 'Manage administration settings, users, workgroups and set report preferences.';
    return (
        <>
            <div>
                <PageHeader header={header} description={description} />
                <Suspense fallback={<LoaderComponent />}>
                    <AdminTasks />
                </Suspense>
            </div>
        </>
    )
}