import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../../types";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<User> => {
      const storedToken = localStorage.getItem("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.get<User>("http://localhost:8080/api/users", {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });

      return response.data;
    },
  });
};
