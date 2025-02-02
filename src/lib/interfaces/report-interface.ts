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
    workGroupId: number
}

export interface CreateReportFormData {
    name: string;
    description?: string;
    reportId: string;
    workspaceId: string;
    status: 'Enable' | 'Disable';
    workGroup: WorkGroup;
}