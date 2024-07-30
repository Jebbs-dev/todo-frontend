import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./task-form";
import { useGetTask } from "@/queries/task/get-task";

export const TaskModal = () => {

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
