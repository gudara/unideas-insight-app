'use client'
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState, useEffect } from "react";
import { NavAdminTask } from "../interfaces";
import DynamicIcon from "@/components/dynamic-icon";


export default function AdminPage() {
    const [adminTasks, setAdminTasks] = useState<NavAdminTask[]>([]);
    useEffect(() => {
        async function fetchNavAdminTasks() {
            const res = await fetch('/api/layout/admin-tasks')
            const data = await res.json()
            setAdminTasks(data);
        }
        fetchNavAdminTasks()
    }, [])


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
                <div className="flex flex-wrap flex-col gap-4">
                    {
                        !adminTasks.length && <>Loading...</>
                    }

                    {
                        adminTasks.length && adminTasks.map((item, index) => (
                            <Link href={item.url} key={'t'+(index)}>
                                <div className="flex  rounded border p-4">
                                    <div className="content-center text-muted-foreground mr-4">
                                        <DynamicIcon name={item.icon} />
                                    </div>
                                    <div className="">
                                        <span className="text-lg font-semibold no-underline hover:underline">
                                            {item.name}
                                        </span>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}