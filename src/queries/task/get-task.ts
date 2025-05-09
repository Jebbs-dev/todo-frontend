import { skipToken, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../../../types";
import { getLocalStorage } from "@/utils/storage";

export const useGetTask = () => {
  const storedToken = getLocalStorage("jwtToken");

  if (!storedToken) {
    throw new Error("No token found, user is not authenticated");
  }

  const parsedToken = JSON.parse(storedToken);

  return useQuery({
    queryKey: ["tasks"],
    queryFn: parsedToken
      ? async (): Promise<Task[]> => {
          const response = await axios.get<Task[]>(
            "https://todo-backend-new-production.up.railway.app/api/tasks",
            {
              headers: {
                Authorization: `Bearer ${parsedToken}`,
              },
            }
          );

          if (!response) {
            throw new Error("Failed to fetch tasks");
          }

          return response.data;
        }
      : skipToken,
  });
};
