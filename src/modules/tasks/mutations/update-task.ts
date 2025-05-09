import { TaskProps } from "@/modules/tasks/components/task-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../../../../types";
import { getLocalStorage } from "@/utils/storage";

export const useUpdateTask = (taskId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: TaskProps): Promise<Task> => {
      const storedToken = getLocalStorage("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.patch<Task>(
        `https://todo-backend-new-production.up.railway.app/api/tasks/${taskId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );
      return response.data;
    },
    onSettled: (data, error) => {
      if (error) {
        console.error("Error updating task:", error.message);
      }
      else {
        queryClient.invalidateQueries({queryKey: ['tasks']})
      }
    },
  });
};
