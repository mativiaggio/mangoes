import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindUserById = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await client.api.users.current.$get();

      if (!response.ok) {
        return null;
      }

      const { users } = await response.json();

      return users;
    },
  });

  return query;
};
