import { FastifyInstance } from "fastify"
import z from "zod";
import { routesUser } from "./controllers/users/@routes";
import { routesSchedule } from "./controllers/schedule/@routes";
import { routesCourt } from "./controllers/courts/@routes";


export const appRoutes = async (app: FastifyInstance) => {
 app.post('/', {
    schema: {
      description: "Essa rota serve para verificar se a API está online",
      tags: ["Teste 🔞"],
      response: {
        201: z.object({
       api: z.string().default("Status da API")
        }),
        
      }
    }
  }, async (request, reply) => {
    return reply.status(200).send({
        api: "Online 🚀"
    });
  }),
  routesUser(app),
  routesSchedule(app),
  routesCourt(app)
}