import { UserProps } from "@/modules/authentication/components/forms/auth-form";
import { useGetUser } from "@/queries/user/fetch-user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useLogoutUser = () => {
  const { data: user } = useGetUser();

  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      );
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
