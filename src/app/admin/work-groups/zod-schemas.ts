import { z } from "zod";

export const workGroupCreateFormSchema = z.object({
    name: z.string()
        .nonempty({
            message: "The work group name is required."
        }),
    icon: z.string()
        .nonempty({
            message: "The icon id is required."
        })
})


