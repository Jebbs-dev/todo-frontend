import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getLocalStorage } from "@/utils/storage";


export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const storedToken = getLocalStorage("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.delete(
        `https://todo-backend-new-production.up.railway.app/api/tasks/${taskId}`,
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
        console.error("Error creating task:", error.message);
      } else {
        queryClient.invalidateQueries({queryKey: ['tasks']})
      }
    },
  });
};
