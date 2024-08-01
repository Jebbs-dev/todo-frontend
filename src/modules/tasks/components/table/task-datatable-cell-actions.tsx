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

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import { TaskModal } from "../components/task-dialog";
import { Task } from "../../../../../types";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import TaskFormDrawer from "../task-drawer";

interface CellActionProps {
  data: Task;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (title: string) => {
    navigator.clipboard.writeText(title);
    toast.success("Task copied to the clipboard");
  };

  console.log(data);

  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <Link href={``} as={`tasks/${data.id}`}> */}
          {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Dialog>
              <DialogTrigger>
              <Plus className="mr-2 h-4 w-4" /> 
                Edit
                <TaskModal />
              </DialogTrigger>
            </Dialog>
          </DropdownMenuItem> */}
          <DropdownMenuItem
            // onClick={() => {
            //   router.push(`/tasks/${data.id}`);
            // }}
            onSelect={(e) => e.preventDefault()}
          >
            <Drawer direction="right">
              <DrawerTrigger>Edit</DrawerTrigger>
              <TaskFormDrawer taskId={""} />
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
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Bug</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Feature</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Documentation</span>
                </DropdownMenuItem>
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
