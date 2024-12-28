import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.auth)["create-account"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.auth)["create-account"]["$post"]
>;

export const useCreateAccount = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth["create-account"]["$post"]({
        json,
      });
      if (!response.ok) {
        throw new Error("Sign up failed");
      }
      return await response.json();
    },
    onSuccess: () => {
      window.location.replace("/");
    },
    onError: (error) => {
      console.error("Sign up Error:", error.message);
    },
  });

  return mutation;
};
