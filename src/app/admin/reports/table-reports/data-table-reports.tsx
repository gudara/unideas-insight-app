"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoaderComponent from "@/components/loader-component";
import { search } from "@/db-operations/reports";
import { DtReportsToolbar } from "./components/dt-reports-toolbar";
import { DtReportsPagination } from "./components/dt-reports-pagination";
import { Report } from "@/lib/interfaces/report-interface"

interface DataTableReportsProps<TData, TValue> {
  columns: ColumnDef<Report, any>[],
}

export function DataTableReports<TData, TValue>({
  columns
}: DataTableReportsProps<TData, TValue>) {
  // const [setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  // const [pageCount, setPageCount] = useState<number>(0);
  const joinSchemas = ['workGroup']

  const { data = { total: 0, data: [], error: null }, isLoading } = useQuery<{
    total: number;
    data: Report[];
    error?: string | null;
  }>({
    queryKey: ['reports', sorting, columnFilters, pagination],
    queryFn: async () => {
      const d = await search({ sorting, columnFilters, pagination, joinSchemas })
      return d?.data?.length
        ? {...d, data: d.data?.map(r=> {
          return {...r, workGroupName: r.workGroup?.name}
        })}
        : { total: 0, data: [], error: null };
    },
  })

  const table = useReactTable<Report>({
    data: data.data,
    columns,
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
    pageCount: data?.total ? (Math.floor(data.total / pagination.pageSize) + (data.total % pagination.pageSize ? 1 : 0)) : 0,
    // pageCount: queryData?.total ? (Math.floor(queryData.total / pagination.pageSize) + (queryData.total % pagination.pageSize ? 1 : 0)) : 0,
    // onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // if(isLoading){
  //   return <>Loading...</>
  // }

  return (
    <div className="space-y-2">
      <DtReportsToolbar table={table} />
      <div className="">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900">
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
            {
              isLoading && true ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-400"
                  >
                    <LoaderComponent />
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
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
                    className="h-24 text-center text-gray-400"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      <DtReportsPagination table={table} />
    </div>
  )
}


