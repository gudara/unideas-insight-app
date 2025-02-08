"use client"

import { WorkGroup } from "@/lib/interfaces/work-group-interface";
import { ColumnDef } from "@tanstack/react-table";
import { DtWorkGroupsColumnHeader } from "./component/dt-work-groups-column-header";
import { DtWorkGroupsRowActions } from "./component/dt-work-groups-row-actions";
import DynamicIcon from "@/components/dynamic-icon";


export const columns: ColumnDef<WorkGroup, any>[] = [

  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DtWorkGroupsColumnHeader column={column} title="Name" showHideOption={false} />
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
    accessorKey: "icon",
    header: ({ column }) => (
      <DtWorkGroupsColumnHeader column={column} title="Lucide Icon" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <span className=" max-w-[500px] truncate font-medium">
            <DynamicIcon iconName={row.getValue("icon")} size={10}></DynamicIcon>
          </span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "iconName",
    header: ({ column }) => (
      <DtWorkGroupsColumnHeader column={column} title="Lucide Icon Name" showHideOption={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <span className=" max-w-[500px] truncate font-medium">
            <span>{row.getValue("icon")}</span>
          </span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    id: "actions",
    cell: ({ row }) => <DtWorkGroupsRowActions row={row} />,
  },
]
