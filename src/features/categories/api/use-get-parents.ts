import { CategoriesApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetParentCategories = () => {
  return useQuery<CategoriesApiResponse, Error>({
    queryKey: ["categories-parents"],
    queryFn: async () => {
      const response = await client.api["categories"]["parents"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data: CategoriesApiResponse = await response.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
