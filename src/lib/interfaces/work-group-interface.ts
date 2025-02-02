import { WorkGroupStatus } from "@prisma/client";
import { BaseInterface } from "./base-interface";

export interface WorkGroup extends BaseInterface {
    id: number;
    name: string;
    status: WorkGroupStatus;
}