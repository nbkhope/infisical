import { TConsumerSecretDALFactory } from "./consumer-secrets-dal";

type TConsumerSecretServiceFactoryDep = {
  consumerSecretsDAL: TConsumerSecretDALFactory;
};

export type TConsumerSecretServiceFactory = ReturnType<typeof consumerSecretServiceFactory>;

const credentials = [
  {
    id: '3b405495-6f51-43ac-8ed1-9fc9da3b775a',
    name: 'Amazon.com',
    username: 'johndoe@mail.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3b405495-6f51-43ac-8ed1-9fc9da3b775b',
    name: 'Google.com',
    username: 'johndoe@mail.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3b405495-6f51-43ac-8ed1-9fc9da3b775c',
    name: 'Microsoft.com',
    username: 'johndoe@mail.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const consumerSecretServiceFactory = ({ consumerSecretDAL }: TConsumerSecretServiceFactoryDep) => {
  return {
    create() {
      return credentials[0];
    },
    get() {
      return credentials[0];
    },
    list() {
      return credentials;
    },
    update() {
      return credentials[0];
    }
  };
};
