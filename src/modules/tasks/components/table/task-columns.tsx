"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./task-datatable-cell-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "../../../../../types";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";
import { PriorityIcons } from "./priority-icons";
import { StatusIcons } from "./status-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TaskLabel } from "./task-labels";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="-ml-4">
              Title
              <ChevronsUpDown className="ml-2 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => column.toggleSorting(false, false)}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true, false)}>
              <ArrowDown className="mr-2 h-4 w-4" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10" />
            <DropdownMenuItem
              onClick={(value) => column.toggleVisibility(!value)}
            >
              <EyeOff className="mr-2 h-4 w-4" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => <TaskLabel data={row.original}  />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="-ml-4">
              Status
              <ChevronsUpDown className="ml-2 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => column.toggleSorting(false, false)}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true, false)}>
              <ArrowDown className="mr-2 h-4 w-4" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10" />
            <DropdownMenuItem
              onClick={(value) => column.toggleVisibility(!value)}
            >
              <EyeOff className="mr-2 h-4 w-4" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => <StatusIcons data={row.original}/>,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="-ml-4">
              Priority
              <ChevronsUpDown className="ml-2 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => column.toggleSorting(false, false)}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true, false)}>
              <ArrowDown className="mr-2 h-4 w-4" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10" />
            <DropdownMenuItem
              onClick={(value) => column.toggleVisibility(!value)}
            >
              <EyeOff className="mr-2 h-4 w-4" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => <PriorityIcons data={row.original} />,
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <CellAction data={row.original}  />,
  },
];
