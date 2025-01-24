'use client'
import { Separator } from "@/components/ui/separator";
import { Suspense } from 'react';
import LoaderComponent from "@/components/loader-component";
import AdminTasks from "./admin-tasks";


export default function AdminPage() {
    return (
        <>
            <div className="space-y-6 px-6 py-0 pb-0 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Administrations</h2>
                    <p className="text-muted-foreground">
                        Manage administration settings, users, workgroups and set report preferences.
                    </p>
                </div>
                <Separator className="my-0" />
                <Suspense fallback={<LoaderComponent />}>
                <AdminTasks />
                </Suspense>
            </div>
        </>
    )
}