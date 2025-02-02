import { z } from "zod";

const newWorkGroupSchema = z.object({
    name: z.string().nonempty( "Workgroup name is required"),
});

export const reportCreateFormSchema = z.object({
    name: z.string()
        .nonempty({
            message: "The report name is required."
        }),
    description: z.string(),
    reportId: z.string()
        .nonempty({
            message: "The address is required."
        }),
    workspaceId: z.string()
        .nonempty({
            message: "The contact person number is required."
        }),
    workGroup: z.union([
        z.number().positive("Workgroup ID must be a positive number"), // Selecting an existing workgroup by ID
        newWorkGroupSchema, // Creating a new workgroup with required fields
    ]),
})


