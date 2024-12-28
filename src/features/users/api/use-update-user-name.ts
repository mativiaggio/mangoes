import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.users)["update-name"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users)["update-name"]["$post"]
>;

export const useUpdateProfileName = () => {
  const mutationName = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.users["update-name"]["$post"]({ json });
      return await response.json();
    },
  });

  return mutationName;
};
