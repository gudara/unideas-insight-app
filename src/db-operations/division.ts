'use server'
import prisma, { errorHandler, comonSearchByTabelStateData, commonGet } from '@/lib/prisma-common-utils';
import { DataTableFilter } from '@/lib/interfaces/data-table-interfaces';
import { CreateDivisionFormData, Division } from '@/lib/interfaces/division-interfaces';
import { Company } from '@/lib/interfaces/company-interfaces';

export async function create(company: Company, data: CreateDivisionFormData, user: any) {

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return {
            error: "Data format error"
        }
    }
    console.log('---------', company)

    const divisionEx = await prisma.division.findUnique({
        where: {
            companyId: company.id,
            name: data.name,
        },
    });
    if (!!divisionEx) {
        return {
            errors: {
                name: "This company already exists"
            }
        }
    }

    try {
        console.log('---------', company)
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
    return commonGet(prisma.division, id)
}


export async function search({ sorting, columnFilters, pagination }: DataTableFilter): Promise<{ total: number, data: Division[], error?: string | null }> {
    return comonSearchByTabelStateData('division', columnFilters, sorting, pagination)
}