"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./task-datatable-cell-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "../../../../../types";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Priority
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
