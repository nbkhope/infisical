import { useQuery } from "@tanstack/react-query";
import { apiRequest } from '@app/config/request';

export const queryKeys = {
  consumerSecretsGetAll: ['consumerSecrets'],
  consumerSecretsGetOne: (consumerSecretId) => ['consumerSecrets', consumerSecretId]
};

export const useGetConsumerSecrets = () => {
  return useQuery({
    queryKey: queryKeys.consumerSecretsGetAll,
    queryFn: async () => {
      const { data } = await apiRequest.get('/api/v3/consumer-secrets');
      return data;
    },
    initialData: [],
  })
}

export const useGetConsumerSecret = (consumerSecretId) => {
  return useQuery({
    queryKey: queryKeys.consumerSecretsGetOne(consumerSecretId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v3/consumer-secrets/${consumerSecretId}`);
      return data;
    }
  });
}
