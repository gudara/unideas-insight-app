'use server';

import { Report } from '@/lib/interfaces/report-interface';
import { assignReports, removeReports } from '@/db-operations/company';
import { Company } from '@/lib/interfaces/company-interfaces';


export async function updateReports(companyId: number, isAssign: boolean, items: Report[]): Promise<{data: Company | null, error: string | null}> {
    if(isAssign){
        return assignReports(companyId, items )
        
    }
    else{
        return removeReports(companyId, items )
    }
}







