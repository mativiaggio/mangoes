import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindTicketById = (id: string) => {
  const query = useQuery({
    queryKey: ["tickets", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID is required to fetch a ticket");
      }

      const response = await client.api.tickets["find-by-id"][":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ticket");
      }

      const { ticket } = await response.json();

      return ticket;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
};
