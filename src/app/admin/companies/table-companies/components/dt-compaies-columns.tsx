"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Company } from "../../interfaces";
import { DtCompaniesColumnHeader } from "./dt-compaies-column-header";


export const columns: ColumnDef<Company>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
          <DtCompaniesColumnHeader column={column} title="Name" showHide={false} />
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
        header: "Contact Persion",
    },
    {
        accessorKey: "contactNumber",
        header: "Contact Number",
    },
    {
        accessorKey: "contactEmail",
        header: "Contact Email",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]
