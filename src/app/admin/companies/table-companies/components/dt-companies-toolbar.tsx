"use client"

import { Table } from "@tanstack/react-table"
import { Search, X } from "lucide-react"
import { statuses } from "../meta-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DtCompaniesFacetedFilter } from "./dt-companies-faceted-filter"
import { DtCompaniesAddNewButton } from "./dt-companies-add-new-button"

interface DtCompaniesToolbarProps<TData> {
  table: Table<TData>
}

export function DtCompaniesToolbar<TData>({
  table,
}: DtCompaniesToolbarProps<TData>) {
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

        {table.getColumn("status") && (
          <DtCompaniesFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
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
      <DtCompaniesAddNewButton />
      {/* <DtCompaniesViewOptions table={table} /> */}
    </div>
  )
}