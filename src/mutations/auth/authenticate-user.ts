import { UserProps } from "@/modules/authentication/components/forms/auth-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useAuthenticateUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: UserProps) => {
      const response = await axios.post(
        "http://localhost:8080/api/auth",
        values,
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    },
    onSettled: (data, error) => {
      if (error) {
        console.error("Error authenticating user:", error.message);
      }
      if (data) {
        router.push("/tasks");
      }
    },
  });
};
