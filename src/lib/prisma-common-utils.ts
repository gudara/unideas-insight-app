// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';

let prisma: PrismaClient;

// Check if Prisma is running in a serverless environment
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development mode, we should reuse the Prisma Client instance
  // to prevent exhausting database connections
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;


export async function commonSearch(
  modelName: string,
  skip: number,
  take: number,
  where: any,
  orderBy: any
): Promise<{ total: number, data: any[], error?: string | null }> {

  try {
    let total = await prisma[modelName as keyof typeof prisma].count({
      where: where ?? {},
      orderBy: orderBy ?? {}
    });
    let data = await prisma[modelName as keyof typeof prisma].findMany({
      skip: skip ?? 0,
      take: take ?? 10,
      where: where ?? {},
      orderBy: orderBy ?? {}
    });
    return { data, total, error: null }
  } catch (error) {
    return { data: [], total: 0, error: errorHandler(error).error }
  } finally {
    await prisma.$disconnect();
  }

}

export function generateWhereByRQColumnFiltersState(columnFilters: ColumnFiltersState | undefined): any {
  // filter string convert to where
  let whereString = '{';
  columnFilters?.map(item => {
    if (typeof item.value === 'string') {
      whereString = ` ${whereString} "${item.id}" : { "contains" : "${item.value}", "mode": "insensitive" },`;
    }
    else if (Array.isArray(item.value)) {
      if (item.value?.length) {
        whereString = ` ${whereString} "${item.id}" : { "in" : [${item.value.map(s => JSON.stringify(s))}]},`;
      }
    }
  });

  whereString = `${whereString.replace(/,\s*$/, "")} }`;
  return JSON.parse(whereString);
}

export function generateOrderByByRQSortingState(sorting: SortingState | undefined): any {
  // short string convert to where
  let orderByString = '[';
  sorting?.map(item=>{
    orderByString = `${orderByString} { "${item.id}" : "${item.desc ? "desc" : "asc"}" }`;
  })
  orderByString = `${orderByString} ]`;
  return JSON.parse(orderByString);
}

export function generateLimitByRQPaginationState(pagination: PaginationState | undefined): {skip: number, take: number} {
  let skip = (typeof pagination?.pageIndex !== "undefined" || typeof pagination?.pageSize !== "undefined" ) ?  (+pagination.pageIndex * +pagination.pageSize) : 0;
  let take = ( typeof pagination?.pageSize !== "undefined" ) ?  ( +pagination.pageSize) : 10;
  return {skip, take}
}

export function errorHandler(error: any): { error: string } {
  if (error instanceof PrismaClientKnownRequestError) {
    // Handle known errors such as unique constraint violations
    if (error.code === 'P2002') {
      // P2002 is a unique constraint violation error code
      // console.error('Unique constraint violation: ', error.meta);
      console.log(error.meta)
      return {
        error: `Unique constraint violation on ${error.meta?.modelName} at ${(error.meta?.target as Array<string>)?.toString()}`
      }
    } else {
      // console.error('Prisma error occurred:', error.message);
      return {
        error: `Prisma error occurred: ${error.message}`
      }
    }
  } else if (error instanceof PrismaClientValidationError) {
    // Handle validation errors (such as missing required fields)
    // console.error('Validation error occurred:', error.message);
    return {
      error: `Validation error occurred: ${error.message}`
    }
  } else {
    // Catch any other error
    // console.error('Unexpected error occurred:', error);
    return {
      error: `Validation error occurred: ${error}`
    }
  }
}

export function comonSearchByTabelStateData(
  columnFilters: ColumnFiltersState | undefined, 
  sorting: SortingState | undefined, 
  pagination: PaginationState | undefined
): Promise<{total: number, data: any[] , error?: string | null}>
{
    // filter convert to where
    const where = generateWhereByRQColumnFiltersState(columnFilters)
    //sorting  convert to order by
    const orderBy = generateOrderByByRQSortingState(sorting)
    //pagination  convert to skip and take by
    const {skip, take} = generateLimitByRQPaginationState(pagination)
    
    return commonSearch('Company', skip, take, where, orderBy)
}

