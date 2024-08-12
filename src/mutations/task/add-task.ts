import { UserProps } from "@/modules/authentication/components/forms/auth-form";
import { TaskProps } from "@/modules/tasks/components/task-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useCreateTask = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: TaskProps) => {
      const storedToken = localStorage.getItem("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.post(
        "http://localhost:8080/api/tasks",
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
        console.error("Error creating task:", error.message);
      }
    },
  });
};
