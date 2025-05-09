import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../../../types";
import { UserSettingsProps } from "@/lib/validation";
import { getLocalStorage } from "@/utils/storage";

export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: UserSettingsProps): Promise<User> => {
      const storedToken = getLocalStorage("jwtToken");

      if (!storedToken) {
        throw new Error("No token found, user is not authenticated");
      }

      const parsedToken = JSON.parse(storedToken);

      const response = await axios.patch<User>(
        `https://todo-backend-new-production.up.railway.app/api/users/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );

      console.log("Hola there");

      return response.data;
    },
    onSettled: (data, error) => {
      if (error) {
        console.error("Error updating user:", error.message);
      }
      else {
        queryClient.invalidateQueries({queryKey: ['users']})
      }
    },
  });
};
