import { SecretsApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetSecrets = () => {
  return useQuery<SecretsApiResponse, Error>({
    queryKey: ["secrets"],
    queryFn: async () => {
      const response = await client.api.auth.secrets.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch secrets");
      }

      const data: SecretsApiResponse = await response.json();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
