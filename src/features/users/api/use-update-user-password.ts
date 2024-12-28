import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.users)["update-password"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users)["update-password"]["$post"]
>;

export const useUpdateProfilePassword = () => {
  const mutationPassword = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.users["update-password"]["$post"]({
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

  return mutationPassword;
};
