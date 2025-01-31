'use server';

import { revalidatePath } from 'next/cache';
import { create, update } from '@/db-operations/division';
import { divisionCreateFormSchema } from '../../zodSchemas';
import { CreateDivisionFormData } from '@/lib/interfaces/division-interfaces';
import { Company } from '@/lib/interfaces/company-interfaces';


export async function createDivision(company: Company, formData: any) {
  //TODO - need to implement authendication

  //check wether form data or not
  if (!(formData instanceof FormData)) {
    return {
      error: "Submitted form data is not in valid format"
    }
  }

  //validate using zod
  const currentFormData = Object.fromEntries(formData);
  const validate = divisionCreateFormSchema.safeParse(currentFormData);
  if (!validate.success) {
    const formFieldErrors = validate.error.flatten().fieldErrors;
    return {
      errors: {
        name: formFieldErrors?.name,
        contactPersonName: formFieldErrors?.contactPersonName,
        contactNumber: formFieldErrors?.contactNumber,
        contactEmail: formFieldErrors?.contactEmail,
        address: formFieldErrors?.address
      },
    };
  }

  return await create(company, validate.data as CreateDivisionFormData, {username: 'user'});
}


export async function updateDivision(company: Company, id: number, formData: any): Promise<any> {
  //TODO - need to implement authendication

  //check wether form data or not
  if (!(formData instanceof FormData)) {
    return {
      error: "Submitted form data is not in valid format"
    }
  }

  //validate using zod
  const currentFormData = Object.fromEntries(formData);
  const validate = divisionCreateFormSchema.safeParse(currentFormData);
  if (!validate.success) {
    const formFieldErrors = validate.error.flatten().fieldErrors;
    return {
      errors: {
        name: formFieldErrors?.name,
        contactPersonName: formFieldErrors?.contactPersonName,
        contactNumber: formFieldErrors?.contactNumber,
        contactEmail: formFieldErrors?.contactEmail,
        address: formFieldErrors?.address
      },
    };
  }

  return await update(company, id, validate.data as CreateDivisionFormData, {username: 'user'})
  
  // return validate.data
  revalidatePath('/')
}






