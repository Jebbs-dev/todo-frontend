"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Copy,
  Edit,
  Mail,
  MessageSquare,
  MoreHorizontal,
  PlusCircle,
  Trash,
  UserPlus,
} from "lucide-react";

import { labels } from "./data/labels";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Task } from "../../../../../types";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import TaskFormDrawer from "../task-sheet";

import { FunctionComponent, useState } from "react";
import useLabelStore from "@/store/useTaskLabel";
import { useDeleteTask } from "@/modules/tasks/mutations/delete-task";

interface CellActionProps {
  data: Task;
  // label: string;
}

export const CellAction: FunctionComponent<CellActionProps> = ({ data }) => {
  const labelStore = useLabelStore.getState();

  const { mutateAsync: deleteTask, isPending } = useDeleteTask(data._id);

  const onCopy = (title: string) => {
    navigator.clipboard.writeText(title);
    toast.success("Task copied to the clipboard");
  };

  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const onEditTask = (e: any) => {
    e.preventDefault();
    setIsTaskOpen(true);
    // editSheet.onOpen(true);
  };

  const onDeleteTask = (e: any) => {
    e.preventDefault();
    deleteTask();
    toast.success("Task deleted successfully!");
  };

  const router = useRouter();
  return (
    <>
      <TaskFormDrawer
        isOpen={isTaskOpen}
        setIsOpen={setIsTaskOpen}
        task={data}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEditTask}>
            <Drawer direction="right">
              <DrawerTrigger>Edit</DrawerTrigger>
            </Drawer>
          </DropdownMenuItem>
          {/* </Link> */}
          <DropdownMenuItem
            onClick={() => {
              onCopy(data.title);
            }}
          >
            {/* <Copy className="mr-2 h-4 w-4" /> */}
            Make a copy
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <Edit className="mr-2 h-4 w-4" /> */}
            Favorite
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {/* <UserPlus className="mr-2 h-4 w-4" /> */}
              <span>Labels</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {labels.map((label) => (
                  <DropdownMenuItem
                    key={label}
                    onSelect={() => {
                      labelStore.setLabel(data._id, label);
                    }}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem onClick={onDeleteTask}>
            {/* <Trash className="mr-2 h-4 w-4" /> */}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
