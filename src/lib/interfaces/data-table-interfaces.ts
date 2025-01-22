import { ColumnFiltersState, PaginationState, SortingState, SortingTableState } from "@tanstack/react-table";

export interface DataTableFilter {
    sorting?: SortingState,
    columnFilters?: ColumnFiltersState,
    pagination?: PaginationState
}