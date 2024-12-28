import { Users } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type ResponseType = {
  success: boolean;
  documentId?: string;
  document?: Users;
  message?: string;
};

export const useGetUserDocument = (userId: string | null) => {
  return useQuery<ResponseType, Error>({
    queryKey: ["user-document", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const response = await client.api.users["find-user-document"]["$get"]({
        params: { userId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user document");
      }

      return await response.json();
    },
    enabled: !!userId,
  });
};
