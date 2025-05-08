import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserAuthStatus = () => {

  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/status",
          // { withCredentials: true }
        );

        if (!response) {
          throw new Error("Failed to fetch auth status");
        }
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.log("Error checking auth status:", error);
      }
    },
  });
};
