"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  PaginationTableState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DtCompaniesToolbar } from "./components/dt-companies-toolbar";
import { DtCompaniesPagination } from "./components/dt-companies-pagination";
import {  useEffect, useState } from "react";
import { useQuery} from "@tanstack/react-query";
import { Company } from "@/lib/interfaces/company-interfaces";
import { DataTableFilter } from "@/lib/interfaces/data-table-interfaces";
import { search } from "@/db-operations/company";

interface DataTableCompaniesProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
}

export function DataTableCompanies<TData, TValue>({
  columns,
}: DataTableCompaniesProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  
  const {data: queryData, isError, isLoading } = useQuery({
    queryKey: ['companies', sorting, columnFilters, pagination],
    queryFn: async () => {
      return await search({sorting, columnFilters, pagination});
    },
    
  })

  const table = useReactTable({
    data:  queryData?.data ?? [],
    columns: columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    initialState: {
      columnVisibility: {
        id: false, // Set 'id' column to be hidden initially
      },
    },
    enableRowSelection: false,
    enableMultiSort: true,
    manualPagination: true, // Enable manual pagination
    pageCount: +queryData?.total ? (Math.floor(queryData.total/pagination.pageSize) + (queryData.total%pagination.pageSize ? 1 : 0)) : 0,
    // onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DtCompaniesToolbar table={table} />
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DtCompaniesPagination table={table} />
    </div>
  )
}


