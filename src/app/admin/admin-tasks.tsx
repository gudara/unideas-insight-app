import { useEffect, useState } from "react";
import { NavAdminTask } from "../interfaces";
import Link from "next/link";
import DynamicIcon from "@/components/dynamic-icon";

export default function AdminTasks() {
    const [adminTasks, setAdminTasks] = useState<NavAdminTask[]>([]);
    useEffect(() => {
        async function fetchNavAdminTasks() {
            const res = await fetch('/api/layout/admin-tasks')
            const data = await res.json()
            setAdminTasks(data);
        }
        fetchNavAdminTasks()
    }, [])

    // if (adminTasks.length <= 0) throw new Promise(() => {});
    
    return (

        <div className="flex flex-wrap flex-col gap-4">
            {
                adminTasks.length && adminTasks.map((item, index) => (
                    <Link href={item.url} key={'t' + (index)}>
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
    )
}