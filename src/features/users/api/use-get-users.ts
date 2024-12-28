import { UsersApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery<UsersApiResponse, Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await client.api["users"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: UsersApiResponse = await response.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
