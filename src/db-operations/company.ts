'use server'
import prisma, { errorHandler } from '@/lib/prisma';
import { Company, CreateCompanyFormData } from "../lib/interfaces/company-interfaces";
import { DataTableFilter } from '@/lib/interfaces/data-table-interfaces';

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


export async function getCompanies({sorting, columnFilters, pagination}: DataTableFilter): Promise<{total: number, data: Company[] , error?: string | null}>{
  let skip = (typeof pagination?.pageIndex !== "undefined" || typeof pagination?.pageSize !== "undefined" ) ?  (+pagination.pageIndex * +pagination.pageSize) : 0;
  let take = ( typeof pagination?.pageSize !== "undefined" ) ?  ( +pagination.pageSize) : 10;
  
  console.log(sorting, columnFilters, pagination)
  let whereString = '{';
  columnFilters?.map(item=>{
    whereString = ` ${whereString} "${item.id}" : { "contains" : "${item.value}", "mode": "insensitive" }`;
  })
  whereString = `${whereString} }`;

  console.log('whereString', whereString, JSON.parse(whereString))

  try {
    let total = await prisma.company.count({
    });
    let data = await prisma.company.findMany({
      skip,
      take,
      where: JSON.parse(whereString)
    });
    return {data, total, error: null}
  } catch (error) {
    return {data: [], total: 0, error: errorHandler(error).error}
  } finally {
    await prisma.$disconnect();
  }
}