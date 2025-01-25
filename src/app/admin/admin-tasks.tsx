
'use client'
import { NavAdminTask } from "../interfaces";
import Link from "next/link";
import DynamicIcon from "@/components/dynamic-icon";

interface AdminTasksProps {
    adminTasks: NavAdminTask[] | undefined
}

export default function AdminTasks({ adminTasks }: AdminTasksProps) {

    return (
        <div className="flex flex-wrap flex-col gap-4">
            {
                 adminTasks?.map((item: NavAdminTask, index: number) => (
                    <Link href={item.url} key={'t' + (index)}>
                        <div className="flex  rounded border p-4">
                            <div className="content-center text-muted-foreground mr-4">
                                <DynamicIcon iconName={item.icon} size={24} />
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


