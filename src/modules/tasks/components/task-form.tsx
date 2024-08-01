import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTask } from "@/mutations/task/add-task";
import { Task } from "../../../../types";
import { useUpdateTask } from "@/mutations/task/update-task";
import toast from "react-hot-toast";

interface TaskFormProps {
  initialData?: Task;
}

const formSchema = z.object({
  title: z.string({
    message: "The task title must not be empty.",
  }),
  status: z.enum(["Backlog", "Todo", "In Progress", "Done", "Cancelled"], {
    required_error: "Please select a status for your task.",
  }),
  // dueDate: z.date().optional(),
  priority: z.enum(["Low", "Medium", "High"], {
    required_error: "Please select a priority level for your task",
  }),
});

export type TaskProps = z.infer<typeof formSchema>;

export const TaskForm: React.FC<TaskFormProps> = ({ initialData }) => {
  const { mutateAsync: createTask, isSuccess } = useCreateTask();
  const { mutateAsync: updateTask } = useUpdateTask();

  const toastMessage = initialData ? "Task updated" : "Task created";

  const taskId = initialData?.id;

  const form = useForm<TaskProps>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      status: "Backlog",
      priority: "Low",
    },
  });

  const handleCreateTask = async (values: TaskProps) => {
    try {
      await createTask(values);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleUpdateTask = async (values: TaskProps, taskId: string) => {
    try {
      if (initialData) {
        await updateTask({ taskId, values });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={
            initialData
              ? form.handleSubmit((values) =>
                  handleUpdateTask(values, taskId as string)
                )
              : 
              form.handleSubmit(handleCreateTask)
          }
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="This is a task"
                    {...field}
                    className="bg-transparent"
                  />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row w-full space-x-5">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent">
                          <SelectValue placeholder="Backlog" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Backlog">Backlog</SelectItem>
                        <SelectItem value="Todo">Todo</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent">
                          <SelectValue placeholder="Low" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full hover:bg-gray-600 mt-2">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
