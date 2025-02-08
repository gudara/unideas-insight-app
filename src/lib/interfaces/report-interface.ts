import { ReportStatus, WorkGroup } from '@prisma/client';
import { BaseInterface } from './base-interface';


export interface Report extends BaseInterface {
    id: number;
    name: string;
    description?: string;
    reportId: string ;
    workspaceId: string;
    status: ReportStatus;
    workGroup: WorkGroup;
    workGroupId: number;
    workGroupName?: string;
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