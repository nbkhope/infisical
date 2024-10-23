
import { useGetConsumerSecrets } from "@app/hooks/api/consumerSecrets"
import { useState } from "react";

import { UserSecretsEdit } from "./UserSecretsEdit";
import { UserSecretsNew } from "./UserSecretsNew";
import { UserSecretsList } from "./UserSecretsList";

export const UserSecretsSection = () => {
  const a = useGetConsumerSecrets();
  
  const [selectedConsumerSecretId, setSelectedConsumerSecret] = useState(null);

  return (
    <div>
      <UserSecretsEdit
        onCancel={() => setSelectedConsumerSecret(null)}
        selectedConsumerSecretId={selectedConsumerSecretId}
      />
      <UserSecretsNew />
      <UserSecretsList onItemClick={(itemId) => setSelectedConsumerSecret(itemId)} />
    </div>
  )
}
