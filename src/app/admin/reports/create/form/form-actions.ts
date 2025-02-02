'use server';

import { revalidatePath } from 'next/cache';
import { create, update } from '@/db-operations/reports';
import { reportCreateFormSchema } from '../../zod-schemas';
import { CreateReportFormData } from '@/lib/interfaces/report-interface';


export async function createReport(formData: any) {
    //TODO - need to implement authendication

    //check wether form data or not
    if (!(formData instanceof FormData)) {
        return {
            error: "Submitted form data is not in valid format"
        }
    }

    //validate using zod
    const currentFormData = Object.fromEntries(formData);
    const validate = reportCreateFormSchema.safeParse(currentFormData);
    if (!validate.success) {
        const formFieldErrors = validate.error.flatten().fieldErrors;
        return {
            errors: {
                name: formFieldErrors?.name,
                description: formFieldErrors?.description,
                reportId: formFieldErrors?.reportId,
                workspaceId: formFieldErrors?.workspaceId,
                workGroup: formFieldErrors?.workGroup
            },
        };
    }

    return await create(validate.data as CreateReportFormData, { username: 'user' });
}


export async function updateReport(id: number, formData: any): Promise<any> {
    //TODO - need to implement authendication

    //check wether form data or not
    if (!(formData instanceof FormData)) {
        return {
            error: "Submitted form data is not in valid format"
        }
    }

    //validate using zod
    const currentFormData = Object.fromEntries(formData);
    const validate = reportCreateFormSchema.safeParse(currentFormData);
    if (!validate.success) {
        const formFieldErrors = validate.error.flatten().fieldErrors;
        return {
            errors: {
                name: formFieldErrors?.name,
                description: formFieldErrors?.description,
                reportId: formFieldErrors?.reportId,
                workspaceId: formFieldErrors?.workspaceId,
                workGroup: formFieldErrors?.workGroup
            },
        };
    }

    return await update(id, validate.data as CreateReportFormData, { username: 'user' })

    // return validate.data
    revalidatePath('/')
}






