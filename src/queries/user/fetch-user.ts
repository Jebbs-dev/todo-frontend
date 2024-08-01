import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../../types";
import { useGetUserAuthStatus } from "../auth/get-user-status";

export const useGetUser = () => {

  const { data: authenticatedUser } = useGetUserAuthStatus();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/api/users/${authenticatedUser._id}`
        // { withCredentials: true }
      );

      return response.data;
    },
  });
};
