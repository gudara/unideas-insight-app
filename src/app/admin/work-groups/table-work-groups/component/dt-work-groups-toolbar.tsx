"use client"

import { Table } from "@tanstack/react-table"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DtWorkGroupsAddNewButton } from "./dt-work-groups-add-new-button"

interface DtWorkGroupsToolbarProps<TData> {
  table: Table<TData>
}

export function DtWorkGroupsToolbar<TData>({
  table,
}: DtWorkGroupsToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-8 w-[150px] lg:w-[250px]"
          />
        </div>

        {/* {table.getColumn("status") && (
          <ReportStatusSelector
            column={table.getColumn("status")}
            title="Status"
            onChange={()=> {}}
          />
        )} */}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DtWorkGroupsAddNewButton />
      {/* <DtCompaniesViewOptions table={table} /> */}
    </div>
  )
}