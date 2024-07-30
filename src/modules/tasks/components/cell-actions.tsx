"use client"

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
import { TaskColumn } from "./columns";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: TaskColumn;
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
  const onCopy = (title: string) => {
    navigator.clipboard.writeText(title);
    toast.success("Task copied to the clipboard");
  };

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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
          >
            {/* <Copy className="mr-2 h-4 w-4" /> */}
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
          onClick={() => {
            onCopy(data.title);
          }}
          >
            {/* <Copy className="mr-2 h-4 w-4" /> */}
            Make a copy
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {/* <UserPlus className="mr-2 h-4 w-4" /> */}
              <span>Favourite</span>
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
          >
            {/* <Edit className="mr-2 h-4 w-4" /> */}
            Labels
          </DropdownMenuItem>
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
