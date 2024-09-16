import { UserProps } from "@/lib/validation";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TaskFilters {
  tasks: unknown;
}

export const useAuthenticateUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: UserProps) => {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        values
        // { withCredentials: true }
      );
   
      const storedToken = response.data.accessToken;
      localStorage.setItem("jwtToken", JSON.stringify(storedToken));

      return response.data;
    },
    onSettled: (data, error) => {
      if (error) {
        console.error("Error authenticating user:", error.message);
      }
      if (data) {
        router.push("/");
      }
    },
  });
};
