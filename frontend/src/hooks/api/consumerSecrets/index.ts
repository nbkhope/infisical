import { useQuery } from "@tanstack/react-query";
import { apiRequest } from '@app/config/request';

export const useGetConsumerSecrets = () => {
  return useQuery({
    queryKey: ['consumerSecrets'],
    queryFn: async () => {
      const { data } = await apiRequest.get('/api/v3/consumer-secrets');
      return data;
    },
  })
}

export const useGetConsumerSecret = (consumerSecretId) => {
  return useQuery({
    queryKey: ['consumerSecret'],
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v3/consumer-secrets/${consumerSecretId}`);
      return data;
    }
  });
}
