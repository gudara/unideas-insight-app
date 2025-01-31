import { phoneRegex } from "@/app/reg-exp";
import { z } from "zod";

export const divisionCreateFormSchema = z.object({
    name: z.string()
        .min(3, {
            message: "The division name must be at least 3 characters."
        })
        .max(50, {
            message: "The division name must be less than 50 characters."
        })
        .nonempty({
            message: "The company name is required."
        }),
    contactPersonName: z.string()
        .min(3, {
            message: "The contact person name must be at least 3 characters."
        })
        .max(50, {
            message: "The contact person name must be less than 50 characters."
        })
        .nonempty({
            message: "The contact person name is required."
        }),
    address: z.string()
        .min(3, {
            message: "The address must be at least 3 characters."
        })
        .max(250, {
            message: "The address must be less than 250 characters."
        })
        .nonempty({
            message: "The address is required."
        }),
    contactNumber: z.string()
        .nonempty({
            message: "The contact person number is required."
        })
        .regex(phoneRegex, 'Invalid contact number!'),
    contactEmail: z.string()
        .nonempty({
            message: "The contact person number is required."
        })
        .email("This is not a valid email."),
})