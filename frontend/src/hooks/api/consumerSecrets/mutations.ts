import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@app/config/request";

export const useCreateConsumerSecret = () => {
  // return;
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiRequest.get(`/api/v3/consumer-secrets`);
      return data;
    },
  });
}
