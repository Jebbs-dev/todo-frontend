import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FunctionComponent } from "react";

import { TaskForm } from "./task-form";

import { Task } from "../../../../types";
import { useRouter } from "next/navigation";

interface TaskFormSheetProps {
  task: Task;
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const TaskFormSheet: FunctionComponent<TaskFormSheetProps> = ({
  isOpen,
  setIsOpen,
  task,
}) => {
  const router = useRouter();

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Task</SheetTitle>
          <SheetDescription>Update selected task here</SheetDescription>
        </SheetHeader>
        <TaskForm
          initialData={task as Task}
          closeDialog={() => {
            setIsOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default TaskFormSheet;
