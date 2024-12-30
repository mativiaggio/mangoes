import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.categories.new)["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories.new)["$post"]
>;

export const useNewCategory = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.categories.new["$post"]({ json });
      return await response.json();
    },
  });

  return mutation;
};
