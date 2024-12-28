import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.users)["update-image"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users)["update-image"]["$post"]
>;

export const useUpdateProfileImage = () => {
  const mutationImage = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.users["update-image"]["$post"]({
        form,
      });
      return await response.json();
    },
  });

  return mutationImage;
};
