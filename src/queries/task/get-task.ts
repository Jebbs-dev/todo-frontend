import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../../../types";

export const useGetTask = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async ()=> {
      const response = await axios.get(
        "http://localhost:8080/api/tasks",
        { withCredentials: true }
      );

      if (!response) {
        throw new Error("Failed to fetch tasks");
      }
      console.log(response.data);
      return response.data;
    },
  });
};
