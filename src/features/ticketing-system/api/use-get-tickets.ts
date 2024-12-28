import { TicketsApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetTickets = () => {
  return useQuery<TicketsApiResponse, Error>({
    queryKey: ["tickets"],
    queryFn: async () => {
      const response = await client.api.tickets.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data: TicketsApiResponse = await response.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
