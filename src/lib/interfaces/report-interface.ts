import { ReportStatus, WorkGroup } from '@prisma/client';
import { BaseInterface } from './base-interface';
import { Division } from './division-interfaces';
import { Company } from './company-interfaces';


export interface Report extends BaseInterface {
    id: number;
    name: string;
    description?: string | null;
    reportId: string ;
    workspaceId: string;
    status: ReportStatus;
    workGroup?: WorkGroup;
    workGroupId: number;
    workGroupName?: string;
    divisions?: Division[];
    companies?: Company[];
}

export interface CreateReportFormData {
    name: string;
    description?: string;
    reportId: string;
    workspaceId: string;
    status: 'Enable' | 'Disable';
    workGroupId: number;
    workGroupName?: string;
}