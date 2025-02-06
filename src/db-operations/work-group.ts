'use server'
import { DataTableFilter } from "@/lib/interfaces/data-table-interfaces";
import { WorkGroup } from "@/lib/interfaces/work-group-interface";
import { comonSearchByTabelStateData } from '@/lib/prisma-common-utils';
import { WorkGroupStatus } from "@prisma/client";


export async function search({ sorting, columnFilters, pagination }: DataTableFilter): Promise<{ total: number, data: WorkGroup[], error?: string | null }> {
    return comonSearchByTabelStateData('workGroup', columnFilters, sorting, pagination)
}


// export async function getAllEnabled(): Promise<WorkGroup[]> {
//     return await prisma.workGroup.findMany({
//         where: {
//             status: 'Enable',
//         },
//     });

// }