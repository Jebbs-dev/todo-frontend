"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./task-datatable-cell-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "../../../../../types";

// export type TaskColumn = {
//   id: string;
//   title: string;
//   status: "Backlog" | "Todo" | "In Progress" | "Done" | "Cancelled";
//   priority: "Low" | "Medium" | "High";
// };

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "task",
    header: "Task",
    cell: ({ row }) => {
      const formattedId = `TASK-${row.index + 1}`;

      return <div>{formattedId}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      const id = row.id;

      return <div>{id}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
