import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../../../types";

export const useGetTask = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<Task[]> => {
      const storedToken = localStorage.getItem("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.get<Task[]>(
        "http://localhost:8080/api/tasks",
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
    },
    
  });
  
};
