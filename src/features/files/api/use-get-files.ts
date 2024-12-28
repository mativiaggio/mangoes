import { FilesApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetFiles = () => {
  return useQuery<FilesApiResponse, Error>({
    queryKey: ["files"],
    queryFn: async () => {
      const response = await client.api["files"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }

      const data: FilesApiResponse = await response.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
