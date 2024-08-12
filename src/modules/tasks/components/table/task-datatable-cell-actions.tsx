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
// import { TaskColumn } from "./columns";

import { labels } from "./data/labels";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import { TaskModal } from "../components/task-dialog";
import { Task } from "../../../../../types";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import TaskFormDrawer from "../task-sheet";

import { FunctionComponent, useState } from "react";
import Link from "next/link";
import useEditModal from "@/hooks/edit-modal-store";

interface CellActionProps {
  data: Task;
  // label: string;
}

export const CellAction: FunctionComponent<CellActionProps> = ({ data }) => {
  const onCopy = (title: string) => {
    navigator.clipboard.writeText(title);
    toast.success("Task copied to the clipboard");
  };

  const editSheet = useEditModal();

  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const onEditTask = (e: any) => {
    e.preventDefault();
    setIsTaskOpen(true);
    // editSheet.onOpen(true);

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
                  <DropdownMenuItem key={label} onSelect={() => {}}>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem
          // onClick={() => setOpen(true)}
          >
            {/* <Trash className="mr-2 h-4 w-4" /> */}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
