'use server';

import { assignReports, removeReports } from '@/db-operations/division';
import { Division } from '@/lib/interfaces/division-interfaces';
import { Report } from '@/lib/interfaces/report-interface';


export async function updateReports(divisionId: number, isAssign: boolean, items: Report[]): Promise<{data: Division | null, error: string | null}> {
    if(isAssign){
        return assignReports(divisionId, items )
        
    }
    else{
        return removeReports(divisionId, items )
    }
}







