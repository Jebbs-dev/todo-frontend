import { UserProps } from "@/modules/authentication/components/forms/auth-form";
import { TaskProps } from "@/modules/tasks/components/task-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useDeleteTask = (taskId: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const storedToken = localStorage.getItem("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.delete(
        `http://localhost:8080/api/tasks/${taskId}`,
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
      }
      if (data) {
        router.push("/tasks");
        router.refresh();
      }
    },
  });
};
