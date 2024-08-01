import { TaskProps } from "@/modules/tasks/components/task-form";
import { useGetTask } from "@/queries/task/get-task";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Task } from "../../../types";

export const useUpdateTask = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      values,
      taskId,
    }: {
      values: TaskProps;
      taskId: string;
    }): Promise<Task> => {
      const response = await axios.patch<Task>(
        `http://localhost:8080/api/tasks/${taskId}`,
        values
      );
      console.log(response.data);
      return response.data;
    },
    onSettled: (data, error) => {
      if (error) {
        console.error("Error updating task:", error.message);
      }
      if (data) {
        router.push("/tasks");
        router.refresh();
      }
    },
  });
};
