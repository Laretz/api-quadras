import { FastifyInstance } from "fastify";
import { z } from "zod";
import { createUserController, schemaCreateUser } from "./create-user-controller";
import { updateUserController } from "./update-user-controller";
import { getAllUsersController } from "./getall-user-controller";
import { deleteUserController } from "./delete-user-controller";

export const schemaUserResponse = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.string().email(),
  telefone: z.string(),
  role: z.string(),
});

export async function routesUser(app: FastifyInstance) {


  
  // CREATE
  app.post("/users", {
    schema: {
      description: "Cria um novo usuário",
      tags: ["Usuário"],
      body: schemaCreateUser,
      response: {
        201: z.object({ user: schemaCreateUser }),
        400: z.object({ message: z.string() }),
      },
    },
  }, createUserController);

  // UPDATE
  app.put("/users/:id", {
    schema: {
      description: "Atualiza um usuário",
      tags: ["Usuário"],
      params: z.object({ id: z.string() }),
      body: z.object({
        nome: z.string().optional(),
        email: z.string().email().optional(),
        senha: z.string().min(6).optional(),
        telefone: z.string().optional(),
        role: z.string().optional()
      }),
      response: {
        200: z.object({ user: schemaCreateUser }),
        400: z.object({ message: z.string() }),
      },
    },
  }, updateUserController);
 
 app.get("/users", {
    schema: {
      description: "Lista todos os usuários",
      tags: ["Usuário"],
      response: {
        200: z.object({
          users: z.array(schemaUserResponse),
        }),
        400: z.object({ message: z.string() }),
      },
    },
  }, getAllUsersController);

    // DELETE
  app.delete("/users/:id", {
    schema: {
      description: "Deleta um usuário",
      tags: ["Usuário"],
      params: z.object({ id: z.string() }),
      response: {
        204: z.null(), // No Content
        400: z.object({ message: z.string() }),
      },
    },
  }, deleteUserController);
  
} 

