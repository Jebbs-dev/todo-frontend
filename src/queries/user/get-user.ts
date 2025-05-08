import { skipToken, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../../types";

export const useGetUser = () => {
  const storedToken = localStorage.getItem("jwtToken");

  if (!storedToken) {
    throw new Error("No token found, user is not authenticated");
  }

  const parsedToken = JSON.parse(storedToken);

  return useQuery({
    queryKey: ["users"],
    queryFn: parsedToken
      ? async (): Promise<User> => {

          const response = await axios.get<User>(
            "http://localhost:8080/api/users",
            {
              headers: {
                Authorization: `Bearer ${parsedToken}`,
              },
            }
          );

          return response.data;
        }
      : skipToken,
  });
};
