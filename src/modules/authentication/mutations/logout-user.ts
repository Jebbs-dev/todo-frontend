import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";

export const useLogoutUser = () => {

  const router = useRouter();

  return useMutation({
    mutationFn: async () => {

      const storedToken = getLocalStorage("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.post(
        "https://todo-backend-new-production.up.railway.app/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );
      
      removeLocalStorage("jwtToken");

      return response.data;
    },
    onSuccess: () => {
      router.push("/auth");
      router.refresh(); 
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
