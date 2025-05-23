import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../../../types";
import { useGetTask } from "./get-task";



export const useGetTaskId = (taskId: string) => {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async (): Promise<Task> => {
      const response = await axios.get<Task>(
        `https://todo-backend-new-production.up.railway.app/api/tasks/${taskId}`
      );

      if (!response) {
        throw new Error("Failed to fetch tasks");
      }

      console.log(response.data)
      return response.data;
    },
  });
};
