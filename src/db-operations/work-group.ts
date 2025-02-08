'use server'
import { DataTableFilter } from "@/lib/interfaces/data-table-interfaces";
import { CreateWorkGroupFormData, WorkGroup } from "@/lib/interfaces/work-group-interface";
import prisma, { comonSearchByTabelStateData, errorHandler } from '@/lib/prisma-common-utils';


export async function search({ sorting, columnFilters, pagination }: DataTableFilter): Promise<{ total: number, data: WorkGroup[], error?: string | null }> {
    return comonSearchByTabelStateData('workGroup', columnFilters, sorting, pagination, undefined)
}

export async function create(data: CreateWorkGroupFormData, user: any) {

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return {
        error: "Data format error"
      }
    }
  
    const fin = await prisma.workGroup.findUnique({
      where: {
        name: data.name,
      },
    });
    if (!!fin) {
      return {
        errors: {
          name: "This work group already exists"
        }
      }
    }
  
    try {
      const draft = await prisma.workGroup.create({
        data: { ...data, createdBy: user.username },
      });
      return {
        data: draft
      }
    } catch (error) {
      return errorHandler(error)
    } finally {
      await prisma.$disconnect();
    }
  }
  
  export async function update(id: number, data: CreateWorkGroupFormData, user: any) {
  
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return {
        error: "Data format error"
      }
    }
  
    const fin = await prisma.workGroup.findUnique({
      where: {
        id: +id,
      },
    });
    if (!fin) {
      return {
        errors: {
          name: "The id is not exists"
        }
      }
    }
  
    const companyUni = await prisma.workGroup.findFirst({
      where: {
        name: data.name,
        id: {
          not: +id
        }
      },
    });
    if (!!companyUni) {
      return {
        errors: {
          name: "This work group name already exists in another recoad"
        }
      }
    }
  
    try {
      const draft = await prisma.workGroup.update({
        where: { id },
        data: { ...data, lastUpdatedBy: user.username },
      });
      return {
        data: draft
      }
    } catch (error) {
      return errorHandler(error)
    } finally {
      await prisma.$disconnect();
    }
  }