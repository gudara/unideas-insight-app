import prisma, { errorHandler } from '@/lib/prisma';
import { Company, CreateCompanyFormData } from "../app/admin/companies/interfaces";

export async function create(data: CreateCompanyFormData, user: any){

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      error : "Data format error"
    }
  }

  const company = await prisma.company.findUnique({
    where: {
      name: data.name,
    },
  });
  if(!!company){
    return {
        errors: {
            name: "This company already exists"
        }
    }
  }

  try {
    const company = await prisma.company.create({
      data: {...data, createdBy: user.username},
    });
    return {
        data: company
    }
  } catch (error) {
    return errorHandler(error)
  } finally {
    await prisma.$disconnect();
  }
}

export async function update(id: number, data: CreateCompanyFormData, user: any){

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      error : "Data format error"
    }
  }

  const company = await prisma.company.findUnique({
    where: {
      id: +id,
    },
  });
  if(!company){
    return {
        errors: {
            name: "The id is not exists"
        }
    }
  }

  const companyUni = await prisma.company.findFirst({
    where: {
      name: data.name,
      id: {
        not: +id
      }
    },
  });
  if(!!companyUni){
    return {
        errors: {
            name: "This company name already exists in another recoad"
        },
        data: company
    }
  }

  try {
    const company = await prisma.company.update({
      where: {id},
      data: {...data, lastUpdatedBy: user.username},
    });
    return {
        data: company
    }
  } catch (error) {
    return errorHandler(error)
  } finally {
    await prisma.$disconnect();
  }
}


export async function getCompanies(): Promise<Company[]>{
  return await prisma.company.findMany()
}