import { useGetConsumerSecrets } from "@app/hooks/api/consumerSecrets"

export const UserSecretsList = () => {
  const { data } = useGetConsumerSecrets();

  return (
    <div>
      <div>User Secrets List</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
