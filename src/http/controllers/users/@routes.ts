import { FastifyInstance } from "fastify";
import { z } from "zod";


import { createUserController, schemaCreate } from "./create-user-controller";


export async function routesUser(app: FastifyInstance) {
  app.post("/users", {
    schema: {
      description: "Cria um novo usuário",
      tags: ["Usuário"],
      body: schemaCreate,
      response: {
        201: z.object({
          user: z.object({
            id: z.string(),
            nome: z.string(),
            email: z.string().email(),
            senha: z.string(),
            telefone: z.string(),
            role: z.string()
          }),
        }),
        400: z.object({
          message: z.string(),
        }),
      },
    },
  }, createUserController);

 
}
