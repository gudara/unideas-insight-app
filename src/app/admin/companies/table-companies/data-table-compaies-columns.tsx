"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Company } from "@/lib/interfaces/company-interfaces";
import { DtCompaniesColumnHeader } from "./components/dt-compaies-column-header";
import { statuses } from "./meta-data";
import { Mail, Phone } from "lucide-react";


export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DtCompaniesColumnHeader column={column} title="Name" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "contactPersonName",
    header: ({ column }) => (
      <DtCompaniesColumnHeader column={column} title="Contact Persion" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("contactPersonName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "contactNumber",
    header: ({ column }) => (
      <DtCompaniesColumnHeader column={column} title="Contact Number" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          <Phone className="mr-2 h-4 w-4 text-muted-foreground" /> 
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("contactNumber")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "contactEmail",
    header: ({ column }) => (
      <DtCompaniesColumnHeader column={column} title="Contact Email" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          <Mail className="mr-2 h-4 w-4 text-muted-foreground" /> 
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("contactEmail")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DtCompaniesColumnHeader column={column} title="Status" showHideOption={false} />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
