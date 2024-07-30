"use client";

import React from "react";
import { columns as taskColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Task, User } from "../../../../types";
// import { tasks } from "../../../../types/dummyProducts";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TaskModal } from "../[taskId]/components/task-dialog";

interface TasksClientProps {
  tasks: Task[];
  currentUser: User;
}

export const TaskClient: React.FC<TasksClientProps> = ({
  tasks,
  currentUser,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-200">
            Welcome back {currentUser?.name}!{/* Welcome back! */}
          </h2>
          <p className="text-sm text-muted-foreground">
            Here's a list of your tasks for this month!
          </p>
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </DialogTrigger>
          <TaskModal />
        </Dialog>
      </div>
      <Separator />
      {tasks && (
        <DataTable columns={taskColumns} data={tasks} searchkey="title" />
      )}
    </>
  );
};
