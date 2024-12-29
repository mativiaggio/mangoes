import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindCategoryBySlug = (slug: string) => {
  const query = useQuery({
    queryKey: ["categories", slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error("Slug is required to fetch a category");
      }

      const response = await client.api.categories["find-by-slug"][
        ":slug"
      ].$get({
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch category");
      }

      const { category } = await response.json();

      return category;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
};
