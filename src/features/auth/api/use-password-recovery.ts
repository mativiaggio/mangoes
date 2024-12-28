import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.auth)["password-recovery"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.auth)["password-recovery"]["$post"]
>;

export const usePasswordRecovery = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth["password-recovery"]["$post"]({
        json,
      });
      if (!response.ok) {
        throw new Error("Password recovery failed");
      }
      return await response.json();
    },
    onError: (error) => {
      console.error("Password recovery Error:", error.message);
    },
  });

  return mutation;
};
