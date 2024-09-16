import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useLogoutUser = () => {

  const router = useRouter();

  return useMutation({
    mutationFn: async () => {

      const storedToken = localStorage.getItem("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );
      
      localStorage.removeItem("jwtToken");

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
