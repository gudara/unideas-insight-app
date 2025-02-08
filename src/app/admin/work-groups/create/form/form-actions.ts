'use server';

import { revalidatePath } from 'next/cache';
import { workGroupCreateFormSchema } from '../../zod-schemas';
import { CreateWorkGroupFormData } from '@/lib/interfaces/work-group-interface';
import { create, update } from '@/db-operations/work-group';


export async function createWg(formData: any) {
    //TODO - need to implement authendication

    //check wether form data or not
    if (!(formData instanceof FormData)) {
        return {
            error: "Submitted form data is not in valid format"
        }
    }

    //validate using zod
    const currentFormData = Object.fromEntries(formData);
    const validate = workGroupCreateFormSchema.safeParse(currentFormData);
    if (!validate.success) {
        const formFieldErrors = validate.error.flatten().fieldErrors;
        return {
            errors: {
                name: formFieldErrors?.name,
                icon: formFieldErrors?.icon,
            },
        };
    }

    return await create(validate.data as CreateWorkGroupFormData, { username: 'user' });
}


export async function updateWg(id: number, formData: any): Promise<any> {
    //TODO - need to implement authendication

    //check wether form data or not
    if (!(formData instanceof FormData)) {
        return {
            error: "Submitted form data is not in valid format"
        }
    }

    //validate using zod
    const currentFormData = Object.fromEntries(formData);
    const validate = workGroupCreateFormSchema.safeParse(currentFormData);
    if (!validate.success) {
        const formFieldErrors = validate.error.flatten().fieldErrors;
        return {
            errors: {
                name: formFieldErrors?.name,
                icon: formFieldErrors?.icon
            }
        }
    }

        return await update(id, validate.data as CreateWorkGroupFormData, { username: 'user' })

        // return validate.data
        revalidatePath('/')
    }






