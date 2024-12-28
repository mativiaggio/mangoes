import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.users)["update-email"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users)["update-email"]["$post"]
>;

export const useUpdateProfileEmail = () => {
  const mutationEmail = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.users["update-email"]["$post"]({
        json,
      });
      return await response.json();
    },
  });

  return mutationEmail;
};
