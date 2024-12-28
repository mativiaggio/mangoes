import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.tickets.update)[":id"]["$put"]
>;
type RequestType = InferRequestType<
  (typeof client.api.tickets.update)[":id"]["$put"]
>;

export const useUpdateTicket = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const { id } = param;

      const response = await client.api.tickets.update[":id"]["$put"]({
        param: { id },
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      window.location.replace("/soporte");
    },
  });

  return mutation;
};
