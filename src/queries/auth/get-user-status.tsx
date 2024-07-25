import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useGetUserAuthStatus = () => {
  const router = useRouter();

  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/status",
          { withCredentials: true }
        );

        if (!response) {
          throw new Error("Failed to fetch auth status");
        }

        return response.data;
      } catch (error) {
        console.log("Error checking auth status:", error);
      }
    },
  });
};
