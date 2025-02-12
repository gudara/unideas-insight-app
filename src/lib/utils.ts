import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AdvanceColumnFilter } from "./interfaces/data-table-interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const filterListOfObjects = <T>(objects: T[], filters: AdvanceColumnFilter[]): T[] => {
  if(!!objects && !!filters){
    return objects.filter((obj) => {
      return filters.every((filter) => {
        // Access the field dynamically by the `id` string
        const fieldValue = obj[filter.id as keyof T];
        if (filter.condition === 'contains' && typeof fieldValue === 'string' && typeof filter.value === 'string') {
          return fieldValue.toLowerCase().includes(filter.value.toLowerCase()); 
        }
        if(filter.condition === 'equal'){
          if ( typeof fieldValue === 'number' && typeof filter.value === 'number') {
            return fieldValue ===  filter.value
          }
        }
        return false; 
      });
    });
  }
  return [];
};
