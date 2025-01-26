import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

export interface DataTableFilter {
    sorting?: SortingState,
    columnFilters?: ColumnFiltersState,
    pagination?: PaginationState
}