import { TConsumerSecretDALFactory } from "./consumer-secrets-dal";

type TConsumerSecretServiceFactoryDep = {
  consumerSecretDAL: TConsumerSecretDALFactory;
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
    async create(consumerSecret) {
      return consumerSecretDAL.create(consumerSecret);
    },
    async delete(consumerSecretId) {
      return consumerSecretDAL.deleteById(consumerSecretId);
    },
    get() {
      return credentials[0];
    },
    async list() {
      return consumerSecretDAL.find({});
    },
    update() {
      return credentials[0];
    }
  };
};
