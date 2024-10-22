
import { useGetConsumerSecrets } from "@app/hooks/api/consumerSecrets"

import { UserSecretsNew } from "./UserSecretsNew";
import { UserSecretsList } from "./UserSecretsList";

export const UserSecretsSection = () => {
  const a = useGetConsumerSecrets();
  console.log(a)
  return (
    <div>
      <UserSecretsNew />
      <UserSecretsList />
    </div>
  )
}
