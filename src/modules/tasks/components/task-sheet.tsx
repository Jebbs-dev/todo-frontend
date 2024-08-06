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
import { Button } from "@/components/ui/button";
import { useGetTask } from "@/queries/task/get-task";
import { useGetTaskId } from "@/queries/task/get-task-id";
import { Task } from "../../../../types";

interface TaskFormSheetProps {
  taskId: string;
  isOpen: boolean;
  setIsOpen(value: boolean): void
  variant?: "create" | "update"; // Add variant prop to control form behavior (create vs update)
}

const TaskFormSheet: FunctionComponent<TaskFormSheetProps> = ({ taskId, isOpen, setIsOpen }) => {
  // const SheetTitle = variant === "create" ? "Create Task" : "Update Task";
  // const SheetDescription = variant === "create" ? "Create a new task here" : "Update this task";

  const { data: task, isLoading } = useGetTaskId(taskId);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
      {/* <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <TaskForm initialData={task as Task} />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    // <SheetContent className="right-0 h-full w-[400px] p-5">
    //   <SheetHeader className="flex flex-col items-center">
    //     <SheetTitle>Update Task</SheetTitle>
    //     <SheetDescription>Update this task here</SheetDescription>
    //   </SheetHeader>
    //   <TaskForm initialData={task as Task} />
    //   <SheetFooter>
    //     {/* <SheetClose>
    //       <Button variant="outline">Close</Button>
    //     </SheetClose> */}
    //   </SheetFooter>
    // </SheetContent>
  );
};

export default TaskFormSheet;
