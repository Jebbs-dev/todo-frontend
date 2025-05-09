import { UserProps } from "@/lib/validation";
import { setLocalStorage } from "@/utils/storage";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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
        "https://todo-backend-new-production.up.railway.app/api/auth/login",
        values
        // { withCredentials: true }
      );

      const storedToken = response.data.accessToken;
      setLocalStorage("jwtToken", storedToken)

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
