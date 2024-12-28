import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.auth)["password-reset"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.auth)["password-reset"]["$post"]
>;

export const usePasswordReset = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth["password-reset"]["$post"]({
        json,
      });
      if (!response.ok) {
        throw new Error("Password reset failed");
      }
      return await response.json();
    },
    onError: (error) => {
      console.error("Password reset Error:", error.message);
    },
  });

  return mutation;
};
