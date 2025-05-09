import { UserProps } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useCreateUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: UserProps) => {
      const response = await axios.post(
        "https://todo-backend-new-production.up.railway.app/api/users/register",
        values
      );
      console.log(response.data);
      return response.data;
    },
    onSettled: (data, error) => {
      if (error) {
        console.error("Error creating user:", error.message);
      }
      if (data) {
        router.push("/tasks");
      }
    },
  });
};
