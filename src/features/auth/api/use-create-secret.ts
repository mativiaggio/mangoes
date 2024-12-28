import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.auth)["create-secret"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.auth)["create-secret"]["$post"]
>;

export const useNewSecret = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth["create-secret"]["$post"]({
        json,
      });
      return await response.json();
    },
    onError: (error) => {
      console.error("Put Error:", error.message);
    },
  });

  return mutation;
};
