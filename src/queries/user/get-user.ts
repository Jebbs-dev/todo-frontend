import { skipToken, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../../types";
import { getLocalStorage } from "@/utils/storage";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<User> => {
      const storedToken = getLocalStorage("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.get<User>(
        "https://todo-backend-new-production.up.railway.app/api/users",
        {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );

      return response.data;
    },
  });
};
