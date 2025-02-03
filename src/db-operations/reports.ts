'use server'
import prisma, { errorHandler, comonSearchByTabelStateData, commonGet } from '@/lib/prisma-common-utils';
import { DataTableFilter } from '@/lib/interfaces/data-table-interfaces';
import { CreateReportFormData } from '@/lib/interfaces/report-interface';

export async function create(data: CreateReportFormData, user: any) {

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return {
            error: "Data format error"
        }
    }

    const rep1 = await prisma.report.findUnique({
        where: {
            name: data.name,
        },
    });
    if (!!rep1) {
        return {
            errors: {
                name: "This report name already exists"
            }
        }
    }

    const rep2 = await prisma.report.findUnique({
        where: {
            reportId: data.reportId,
        },
    });
    if (!!rep2) {
        return {
            errors: {
                reportId: "This report id already exists"
            }
        }
    }

    if (!data.workGroup.id) {
        const wgUni = await prisma.workGroup.findFirst({
            where: {
                name: data.workGroup.name
            }
        });
        if (!!wgUni) {
            return {
                errors: {
                    workGroup: "This already exists, please select exesisting record"
                }
            }
        }
    }

    try {
        let report: any;
        if (data.workGroup.id) {
            const reportData = {
                ...data,
                createdBy: user.username,
                workGroup: {
                    connect: {
                        id: data.workGroup.id
                    },
                },
            };
            report = await prisma.report.create({
                data: reportData,
            });
        }
        else {

            const reportData = {
                ...data,
                createdBy: user.username,
                workGroup: {
                    create: {
                        name: data.workGroup?.name,
                        createdBy: user.username,
                    },
                },
            };
            report = await prisma.report.create({
                data: reportData,
            });
        }
        return {
            data: report
        }
    } catch (error) {
        return errorHandler(error)
    } finally {
        await prisma.$disconnect();
    }
}

export async function update(id: number, data: CreateReportFormData, user: any) {

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return {
            error: "Data format error"
        }
    }

    const report = await prisma.report.findUnique({
        where: {
            id: +id,
        },
    });
    if (!report) {
        return {
            errors: {
                name: "The id is not exists"
            }
        }
    }

    const rnameUni = await prisma.report.findFirst({
        where: {
            name: data.name,
            id: {
                not: +id
            }
        },
    });
    if (!!rnameUni) {
        return {
            errors: {
                name: "This report name already exists in another record"
            },
            data: report
        }
    }

    const ridUni = await prisma.report.findFirst({
        where: {
            reportId: data.reportId,
            id: {
                not: +id
            }
        },
    });
    if (!!ridUni) {
        return {
            errors: {
                reportId: "This report id already exists in another record"
            },
            data: report
        }
    }

    if (!data.workGroup.id) {
        const wgUni = await prisma.workGroup.findFirst({
            where: {
                name: data.workGroup.name
            }
        });
        if (!!wgUni) {
            return {
                errors: {
                    workGroup: "This already exists, please select exesisting record"
                },
                data: report
            }
        }
    }

    try {
        let report;
        if (data.workGroup.id) {
            const reportData = {
                ...data,
                lastUpdatedBy: user.username,
                WorkGroup: {
                    connect: {
                        id: data.workGroup?.id
                    },
                },
            };
            report = await prisma.company.update({
                where: { id },
                data: reportData,
            });
        }
        else {
            const reportData = {
                ...data,
                lastUpdatedBy: user.username,
                WorkGroup: {
                    create: {
                        name: data.workGroup?.name,
                        createdBy: user.username,
                    },
                },
            };
            report = await prisma.company.update({
                where: { id },
                data: reportData,
            });

        }

        return {
            data: report
        }
    } catch (error) {
        return errorHandler(error)
    } finally {
        await prisma.$disconnect();
    }
}

export async function get(id: number) {
    return commonGet('report', id)
}

export async function search({ sorting, columnFilters, pagination }: DataTableFilter): Promise<{ total: number, data: Report[], error?: string | null }> {
    return comonSearchByTabelStateData('report', columnFilters, sorting, pagination)
}