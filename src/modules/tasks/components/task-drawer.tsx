import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TaskForm } from "./task-form";
import { Button } from "@/components/ui/button";
import { useGetTask } from "@/queries/task/get-task";
import { useGetTaskId } from "@/queries/task/get-task-id";
import { Task } from "../../../../types";

interface TaskFormDrawerProps {
  taskId: string;
  variant?: "create" | "update"; // Add variant prop to control form behavior (create vs update)
}

const TaskFormDrawer: React.FC<TaskFormDrawerProps> = ({ taskId }) => {
  // const drawerTitle = variant === "create" ? "Create Task" : "Update Task";
  // const drawerDescription = variant === "create" ? "Create a new task here" : "Update this task";

  const { data: tasks, isLoading } = useGetTaskId(taskId);

  return (
    <DrawerContent className="right-0 h-full w-[400px] p-5">
      <DrawerHeader className="flex flex-col items-center">
        <DrawerTitle>Update Task</DrawerTitle>
        <DrawerDescription>Update this task here</DrawerDescription>
      </DrawerHeader>
      <TaskForm initialData={tasks as Task} />
      <DrawerFooter>
        {/* <DrawerClose>
          <Button variant="outline">Close</Button>
        </DrawerClose> */}
      </DrawerFooter>
    </DrawerContent>
  );
};

export default TaskFormDrawer;
