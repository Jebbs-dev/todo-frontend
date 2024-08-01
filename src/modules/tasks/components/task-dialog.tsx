"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./task-form";
import { useGetTask } from "@/queries/task/get-task";
import { useState } from "react";

export const TaskModal = () => {
  // const [modalAction, setModalAction] = useState("create");
  // const modalTitle = modalAction === "create" ? "Create Task" : "Update Task";
  // const modalDescription = modalAction === "create" ? "Create a new task here" : "Update this task";

  // const toggleAction = () => {
  //   setModalAction((currentAction) =>
  //     currentAction === "create" ? "update" : "create"
  //   );
  // };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl">Create Task</DialogTitle>
        <DialogDescription>Create a new task here</DialogDescription>
      </DialogHeader>
      <TaskForm />
    </DialogContent>
  );
};
