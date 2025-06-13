import { FastifyInstance } from "fastify";
import z from "zod";
import { createCourtController, schemaCreateCourt } from "./create-court-controller";
import { bodySchemaUpdate, updateCourtController } from "./update-court-controller";
import { deleteCourtController } from "./delete-court-controller";
import { getAllCourtsController } from "./getall-court-controller";




export const schemaCourtResponse = z.object({
    id: z.string(),
    nome: z.string(),
    tipo: z.string(),
    localizacao: z.string()
})

//CRIAR
export async function routesCourt(app: FastifyInstance) {
    app.post("/courts", {
        schema: {
            description: "Cria uma nova quadra",
            tags: ["Quadra"],
            body: schemaCreateCourt,
            response: {
                    201: z.object({court: schemaCourtResponse,}),
                    400: z.object({ message: z.string() }),
                  },
        },
    }, createCourtController)

    // Atualizar
  app.put("/courts/:id", {
    schema: {
      description: "Atualiza uma quadra",
      tags: ["Quadra"],
      params: z.object({
        id: z.string(),
      }),
      body: bodySchemaUpdate,
      response: {
        200: z.object({ court: schemaCourtResponse }),
        400: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
  }, updateCourtController);
    

   app.delete("/courts/:id", {
    schema: {
      description: "Deleta uma quadra",
      tags: ["Quadra"],
      params: z.object({
        id: z.string(),
      }),
      response: {
        204: z.null(),
        400: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
  }, deleteCourtController);

    // Listar todas
  app.get("/courts", {
    schema: {
      description: "Lista todas as quadras",
      tags: ["Quadra"],
      response: {
        200: z.object({
          courts: z.array(schemaCourtResponse),
        }),
      },
    },
  }, getAllCourtsController);
}