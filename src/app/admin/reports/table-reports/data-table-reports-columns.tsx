"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MapPin, Phone } from "lucide-react";
import { DtReportsColumnHeader } from "./components/dt-reports-column-header";
import { reportStatuses } from "./report-meta-data";
import { DtReportsRowActions } from "./components/dt-reports-row-actions";


export const columns: ColumnDef<Report, any>[] = [
  
  {
    accessorKey: "id",
    header:"Id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DtReportsColumnHeader column={column} title="Name" showHideOption={false} />
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
    accessorKey: "description",
    header: ({ column }) => (
      <DtReportsColumnHeader column={column} title="Description" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "workGroupName",
    header: ({ column }) => (
      <DtReportsColumnHeader column={column} title="Work Group" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("workGroupName")}
          </span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "reportId",
    header: ({ column }) => (
      <DtReportsColumnHeader column={column} title="Report Id" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("reportId")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "workspaceId",
    header: ({ column }) => (
      <DtReportsColumnHeader column={column} title="Workspace Id" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("workspaceId")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DtReportsColumnHeader column={column} title="Status" showHideOption={false} />
    ),
    cell: ({ row }) => {
      const status = reportStatuses.find(
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
  {
    id: "actions",
    cell: ({ row }) => <DtReportsRowActions row={row} />,
  },
]
