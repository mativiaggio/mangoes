import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindSecretBySecret = (secret: string) => {
  const query = useQuery({
    queryKey: ["secrets", secret],
    queryFn: async () => {
      if (!secret) {
        throw new Error("Secret is required to fetch a secret");
      }

      const response = await client.api.auth["find-secret-by-secret"][
        ":secret"
      ].$get({
        param: { secret },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch secret");
      }

      const { secrets } = await response.json();
      return secrets;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
};
