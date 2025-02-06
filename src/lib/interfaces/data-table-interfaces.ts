import { ColumnFilter,  PaginationState, SortingState } from "@tanstack/react-table";

export interface DataTableFilter {
    sorting?: SortingState,
    columnFilters?: AdvanceColumnFilters[],
    pagination?: PaginationState
}

export interface AdvanceColumnFilters extends ColumnFilter{
    condition?: 'equal' | 'contains' | 'in'
}