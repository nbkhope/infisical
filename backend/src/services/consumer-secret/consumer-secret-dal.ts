import { TDbClient } from "@app/db";
import { TableName } from "@app/db/schemas";

export type TConsumerSecretDALFactory = ReturnType<typeof consumerSecretDALFactory>;

export const consumerSecretDALFactory = (db: TDbClient) => {

  return {  };
};
