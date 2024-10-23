import { z } from "zod";

import { AuthMode } from "@app/services/auth/auth-type";
import { ConsumerSecretsSchema } from "@app/db/schemas";
import { NotFoundError } from "@app/lib/errors";
import { readLimit } from "@app/server/config/rateLimiter"; 
import { verifyAuth } from "@app/server/plugins/auth/verify-auth";

export const registerConsumerSecretRouter = async (server: FastifyZodProvider) => {
  server.route({
    method: "GET",
    url: "/",
    config: {
      rateLimit: readLimit,
    },
    schema: {
      description: "List consumer secrets",
      security: [
        {
          bearerAuth: []
        }
      ],
      response: {
        200: z.array(ConsumerSecretsSchema)
      }
    },
    onRequest: verifyAuth([
      AuthMode.JWT,
      AuthMode.API_KEY,
      AuthMode.SERVICE_TOKEN,
      AuthMode.IDENTITY_ACCESS_TOKEN
    ]),
    handler: async (req) => {
      return server.services.consumerSecret.list();
    },
  })

  server.route({
    method: "GET",
    url: "/:consumerSecretId",
    config: {
      rateLimit: readLimit,
    },
    schema: {
      description: "Get consumer secret",
      security: [
        {
          bearerAuth: []
        }
      ],
      response: {
        200: ConsumerSecretsSchema
      },
      params: z.object({
        consumerSecretId: z.string()
      })
    },
    onRequest: verifyAuth([
      AuthMode.JWT,
      AuthMode.API_KEY,
      AuthMode.SERVICE_TOKEN,
      AuthMode.IDENTITY_ACCESS_TOKEN
    ]),
    handler: async (req) => {
      return server.services.consumerSecret.get(req.params.consumerSecretId);
    },
  });

  server.route({
    method: "POST",
    url: "/",
    config: {
      rateLimit: readLimit,
    },
    schema: {
      description: "Create consumer secrets",
      security: [
        {
          bearerAuth: []
        }
      ],
      response: {
        200: ConsumerSecretsSchema
      },
      body: ConsumerSecretsSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      }),
    },
    onRequest: verifyAuth([
      AuthMode.JWT,
      AuthMode.API_KEY,
      AuthMode.SERVICE_TOKEN,
      AuthMode.IDENTITY_ACCESS_TOKEN
    ]),
    handler: async (req) => {
      return server.services.consumerSecret.create(req.body);
    },
  });

  server.route({
    method: "PUT",
    url: "/:consumerSecretId",
    config: {
      rateLimit: readLimit,
    },
    schema: {
      description: "Update consumer secrets",
      body: ConsumerSecretsSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
      security: [
        {
          bearerAuth: []
        }
      ],
      response: {
        200: ConsumerSecretsSchema
      }
    },
    onRequest: verifyAuth([
      AuthMode.JWT,
      AuthMode.API_KEY,
      AuthMode.SERVICE_TOKEN,
      AuthMode.IDENTITY_ACCESS_TOKEN
    ]),
    handler: async (req) => {
      return server.services.consumerSecret.update(req.body);
    },
  });

  server.route({
    method: "DELETE",
    url: "/:consumerSecretId",
    config: {
      rateLimit: readLimit,
    },
    schema: {
      description: "Delete consumer secret",
      params: z.object({
        consumerSecretId: z.string().trim()
      }),
      security: [
        {
          bearerAuth: []
        }
      ],
      response: {
        201: z.string(),
      },
    },
    onRequest: verifyAuth([
      AuthMode.JWT,
      AuthMode.API_KEY,
      AuthMode.SERVICE_TOKEN,
      AuthMode.IDENTITY_ACCESS_TOKEN
    ]),
    handler: async (req) => {
      const consumerSecret = await server.services.consumerSecret.get(req.params.consumerSecretId);
      if (!consumerSecret) {
        throw new NotFoundError({
          message: "Consumer secret not found"
        });
      }

      await server.services.consumerSecret.delete(req.params.consumerSecretId);

      return;
    },
  });
}
