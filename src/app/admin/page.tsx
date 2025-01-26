// 'use client'
import AdminTasks from "./admin-tasks";
import PageHeader from "@/components/page-header";
import { getAdminTasks } from "./get-admin-tasks-json";
import { NavAdminTask } from "../interfaces";
import { Suspense } from "react";
import LoaderComponent from "@/components/loader-component";


export default async function AdminPage() {

    const header = 'Administrations';
    const description = 'Manage administration settings, users, workgroups and set report preferences.';

    const adminTasks: NavAdminTask[] = await getAdminTasks();

    // const queryOptions: UseQueryOptions<NavAdminTask[], Error> = {
    //     suspense: true, // Correct use of suspense
    //     initialData: [], // Optionally set initial data
    //   };

    // const { data: adminTasks, error, isLoading, isError } = useQuery({
    //     queryKey: ['admin-tasks'],
    //     queryFn: async ()=> {
    //         return await getAdminTasks()
    //     }
    // })

    return (
        <>
            <div>
                <PageHeader header={header} description={description} />
                <Suspense fallback={<LoaderComponent />}>
                    <AdminTasks adminTasks={adminTasks} />
                </Suspense>
            </div>
        </>
    )
}