import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetFilePreviewById = (id: string) => {
  const query = useQuery({
    queryKey: ["files", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID is required to fetch a file");
      }

      const response = await client.api.files["get-file-preview"][":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const { fileUrl } = await response.json();

      return fileUrl;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
};
