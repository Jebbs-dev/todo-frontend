"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./task-form";

import useModalControl from "@/hooks/create-modal-store";
import useCreateModal from "@/hooks/create-modal-store";
import { FunctionComponent } from "react";

interface TaskFormDialogProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

export const TaskModal: FunctionComponent<TaskFormDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  //  const createModal = useCreateModal();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
      }}
    >
      <DialogContent className="max-w-[90vw] sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Task</DialogTitle>
          <DialogDescription>Create a new task here</DialogDescription>
        </DialogHeader>
        <TaskForm
          closeDialog={() => {
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
