import { z } from "zod";

import { AuthMode } from "@app/services/auth/auth-type";
import { ConsumerSecretsSchema } from "@app/db/schemas";
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

  // server.route({
  //   method: "GET",
  //   url: "/:consumerSecretId",
  //   config: {
  //     rateLimit: readLimit,
  //   },
  //   schema: {
  //     description: "List consumer secrets",
  //     security: [
  //       {
  //         bearerAuth: []
  //       }
  //     ],
  //     response: {
  //       200: ConsumerSecretsSchema
  //     },
  //     params: {
  //       consumerSecretId: z.string()
  //     }
  //   },
  //   onRequest: verifyAuth([
  //     AuthMode.JWT,
  //     AuthMode.API_KEY,
  //     AuthMode.SERVICE_TOKEN,
  //     AuthMode.IDENTITY_ACCESS_TOKEN
  //   ]),
  //   handler: async (req) => {
  //     return server.services.consumerSecret.get();
  //   },
  // })

  // server.route({
  //   method: "POST",
  //   url: "/",
  //   config: {
  //     rateLimit: readLimit,
  //   },
  //   schema: {
  //     description: "Create consumer secrets",
  //     security: [
  //       {
  //         bearerAuth: []
  //       }
  //     ],
  //     response: {
  //       200: ConsumerSecretsSchema
  //     }
  //   },
  //   onRequest: verifyAuth([
  //     AuthMode.JWT,
  //     AuthMode.API_KEY,
  //     AuthMode.SERVICE_TOKEN,
  //     AuthMode.IDENTITY_ACCESS_TOKEN
  //   ]),
  //   handler: async (req) => {
  //     return server.services.consumerSecret.create();
  //   },
  // });

  // server.route({
  //   method: "PUT",
  //   url: "/:consumerSecretId",
  //   config: {
  //     rateLimit: readLimit,
  //   },
  //   schema: {
  //     description: "Update consumer secrets",
  //     security: [
  //       {
  //         bearerAuth: []
  //       }
  //     ],
  //     response: {
  //       200: ConsumerSecretsSchema
  //     }
  //   },
  //   onRequest: verifyAuth([
  //     AuthMode.JWT,
  //     AuthMode.API_KEY,
  //     AuthMode.SERVICE_TOKEN,
  //     AuthMode.IDENTITY_ACCESS_TOKEN
  //   ]),
  //   handler: async (req) => {
  //     return server.services.consumerSecret.update();
  //   },
  // });
}
