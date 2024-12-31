import { PlansApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetPlans = () => {
  return useQuery<PlansApiResponse, Error>({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await client.api["plans"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }

      const data: PlansApiResponse = await response.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
