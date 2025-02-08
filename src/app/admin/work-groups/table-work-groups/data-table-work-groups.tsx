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
import { WorkGroup } from "@/lib/interfaces/work-group-interface";
import { DtWorkGroupsToolbar } from "./component/dt-work-groups-toolbar";
import { DtWorkGroupsPagination } from "./component/dt-work-groups-pagination";
import { search } from "@/db-operations/work-group";

interface DataTableWorkGroupsProps<TData, TValue> {
  columns: ColumnDef<WorkGroup, any>[],
}

export function DataTableWorkGroups<TData, TValue>({
  columns
}: DataTableWorkGroupsProps<TData, TValue>) {
  // const [setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  // const [pageCount, setPageCount] = useState<number>(0);
  const joinSchemas = ['workGroup']

  const { data = { total: 0, data: [], error: null }, isLoading } = useQuery<{
    total: number;
    data: WorkGroup[];
    error?: string | null;
  }>({
    queryKey: ['work-groups', sorting, columnFilters, pagination],
    queryFn: async () => {
      const d = await search({ sorting, columnFilters, pagination, joinSchemas })
      return d?.data?.length
        ? d
        : { total: 0, data: [], error: null };

    },

  })

  const table = useReactTable<WorkGroup>({
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
      <DtWorkGroupsToolbar table={table} />
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
      <DtWorkGroupsPagination table={table} />
    </div>
  )
}


