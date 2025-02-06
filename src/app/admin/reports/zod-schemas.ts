import { z } from "zod";

export const reportCreateFormSchema = z.object({
    name: z.string()
        .nonempty({
            message: "The report name is required."
        }),
    description: z.string(),
    reportId: z.string()
        .nonempty({
            message: "The report id is required."
        }),
    workspaceId: z.string()
        .nonempty({
            message: "The workspace id is required."
        }),
    workGroupId: z.number().min(0, "Please select a workgroup"),
    workGroupName: z.string()
        .nonempty({
            message: "The work group name is required."
        }),
})


