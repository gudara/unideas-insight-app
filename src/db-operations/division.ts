'use server'
import prisma, { errorHandler, comonSearchByTabelStateData, commonGet } from '@/lib/prisma-common-utils';
import { DataTableFilter } from '@/lib/interfaces/data-table-interfaces';
import { CreateDivisionFormData, Division } from '@/lib/interfaces/division-interfaces';
import { Company } from '@/lib/interfaces/company-interfaces';
import { Report } from '@/lib/interfaces/report-interface';

export async function create(company: Company, data: CreateDivisionFormData, user: any) {

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return {
            error: "Data format error"
        }
    }
    const divisionEx = await prisma.division.findUnique({
        where: {
            companyId: company.id,
            name: data.name,
        },
    });
    if (!!divisionEx) {
        return {
            errors: {
                name: "This division already exists"
            }
        }
    }

    try {
        const division = await prisma.division.create({
            data: { ...data, companyId: company.id, createdBy: user.username },
        });
        return {
            data: division
        }
    } catch (error) {
        return errorHandler(error)
    } finally {
        await prisma.$disconnect();
    }
}

export async function update(company: Company, id: number, data: CreateDivisionFormData, user: any) {

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return {
            error: "Data format error"
        }
    }

    const divisionEX = await prisma.division.findUnique({
        where: {
            companyId: +company.id,
            id: +id,
        },
    });
    if (!divisionEX) {
        return {
            errors: {
                name: "The id is not exists"
            }
        }
    }

    const divisionUni = await prisma.division.findFirst({
        where: {
            companyId: +company.id,
            name: data.name,
            id: {
                not: +id
            }
        },
    });
    if (!!divisionUni) {
        return {
            errors: {
                name: "This division name already exists in another recoad"
            },
            data: divisionEX
        }
    }

    try {
        const company = await prisma.company.update({
            where: { id },
            data: { ...data, lastUpdatedBy: user.username },
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

export async function get(id: number) {
    return commonGet('division' as any, id)
}

export async function search({ sorting, columnFilters, pagination }: DataTableFilter): Promise<{ total: number, data: Division[], error?: string | null }> {
    return comonSearchByTabelStateData('division' as any, columnFilters, sorting, pagination, undefined)
}

export async function getDivisionWithReports(divisionId: number): Promise<{data?: Division | undefined, error?: string}>{
    // console.log("_______________________________", divisionId)
    if(!divisionId){
      return {
        data:  undefined,
        error: undefined
      }
    }
    try {
      const division = await prisma.division.findUnique({
        where: { id: divisionId },
        include: {
          reports: true // Include all related reports,
        }
      });
      return {
        data:  division ?? undefined,
        error: undefined
      }
    } catch (error) {
      const er = errorHandler(error);
      return {
        data:  undefined,
        error: er.error
      }
    } finally {
      await prisma.$disconnect();
    }
  }

  export async function assignReports(divisionId: number, reports: Report[]): Promise<{data: Division | null, error: string | null}> {
    const divisionCk = await prisma.division.findUnique({
      where: {
        id: divisionId,
      },
    });
    if (!divisionCk) {
      return {
        error: "The company not exists",
        data: null
      }
    }
  
    try {
      const division = await prisma.division.update({
        where: { id: divisionId },
        data: {
          reports: { connect: reports.map(r => { return { id: r?.id } }) }
        },
        include: { reports: true }
      });
      return {
        data: division,
        error: null
      }
    } catch (error) {
      const er =  errorHandler(error);
      return { ...er, data: null}
    } finally {
      await prisma.$disconnect();
    }
  }
  
  export async function removeReports(divisionId: number, reports: Report[]): Promise<{data: Division | null, error: string | null}> {
    const divisionCk = await prisma.division.findUnique({
      where: {
        id: divisionId,
      },
    });
    if (!divisionCk) {
      return {
        error: "The company not exists",
        data: null
      }
    }
  
    try {
      const division = await prisma.division.update({
        where: { id: divisionId },
        data: {
          reports: { disconnect: reports.map(r => { return { id: r?.id } }) }
        },
        include: { reports: true }
      });
      return {
        data: division,
        error: null
      }
    } catch (error) {
      const er =  errorHandler(error);
      return { ...er, data: null}
    } finally {
      await prisma.$disconnect();
    }
  }

