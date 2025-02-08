import { ColumnFilter,  PaginationState, SortingState } from "@tanstack/react-table";

export interface DataTableFilter {
    sorting?: SortingState,
    columnFilters?: AdvanceColumnFilter[],
    pagination?: PaginationState,
    joinSchemas?: string[]
}

export interface AdvanceColumnFilter extends ColumnFilter{
    condition?: 'equal' | 'contains' | 'in'
}