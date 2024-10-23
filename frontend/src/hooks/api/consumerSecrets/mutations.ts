import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@app/config/request";
import { queryKeys } from "./queries";

export const useCreateConsumerSecret = () => {
  return useMutation({
    mutationFn: async (variables) => {
      const { data } = await apiRequest.post(`/api/v3/consumer-secrets`, variables);
      return data;
    },
  });
}

export const useDeleteConsumerSecret = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (consumerSecretId) => {
      const { data } = await apiRequest.delete(`/api/v3/consumer-secrets/${consumerSecretId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.consumerSecretsGetAll
      })
    },
  })
}

export const useUpdateConsumerSecret = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => {
      const { data } = await apiRequest.put(`/api/v3/consumer-secrets/${variables.id}`, variables);
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.consumerSecretsGetAll
      })
    }
  });
}
