'use server';

import { revalidatePath } from 'next/cache';
import { companyCreateFormSchema } from '../zodSchemas';
import { CreateCompanyFormData } from '@/lib/interfaces/company-interfaces';
import { create, update } from '@/db-operations/company';


export async function createCompany(formData: any) {
  //TODO - need to implement authendication

  //check wether form data or not
  if (!(formData instanceof FormData)) {
    return {
      error: "Submitted form data is not in valid format"
    }
  }

  //validate using zod
  const currentFormData = Object.fromEntries(formData);
  const validate = companyCreateFormSchema.safeParse(currentFormData);
  if (!validate.success) {
    const formFieldErrors = validate.error.flatten().fieldErrors;
    return {
      errors: {
        name: formFieldErrors?.name,
        contactPersonName: formFieldErrors?.contactPersonName,
        contactNumber: formFieldErrors?.contactNumber,
        contactEmail: formFieldErrors?.contactEmail,
      },
    };
  }

  return await create(validate.data as CreateCompanyFormData, {username: 'user'});
}


export async function updateCompany(id: number, formData: any): Promise<any> {
  //TODO - need to implement authendication

  //check wether form data or not
  if (!(formData instanceof FormData)) {
    return {
      error: "Submitted form data is not in valid format"
    }
  }

  //validate using zod
  const currentFormData = Object.fromEntries(formData);
  const validate = companyCreateFormSchema.safeParse(currentFormData);
  if (!validate.success) {
    const formFieldErrors = validate.error.flatten().fieldErrors;
    return {
      errors: {
        name: formFieldErrors?.name,
        contactPersonName: formFieldErrors?.contactPersonName,
        contactNumber: formFieldErrors?.contactNumber,
        contactEmail: formFieldErrors?.contactEmail,
      },
    };
  }

  return await update(id, validate.data as CreateCompanyFormData, {username: 'user'})
  
  // return validate.data
  revalidatePath('/')
}






