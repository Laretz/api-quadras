import { FastifyInstance } from "fastify";
import { z } from "zod";
import { schemaUpdateSchedule, updateScheduleController } from "./update-reservation-controller";
import { deleteScheduleController } from "./delete-reservation-controller";
import { getScheduleController } from "./get-reservation-controller";
import { createScheduleController, schemaCreateSchedule } from "./create-reservation-controller";


// Schema de resposta
const schemaScheduleResponse = z.object({
  id: z.string(),
  dataHoraInicio: z.any(),
  dataHoraFim: z.any(),
  status: z.string(),
  user_id: z.string(),
  court_id: z.string(),
});


export async function routesSchedule(app: FastifyInstance) {
  // CREATE
  app.post("/schedules", {
    schema: {
      description: "Cria uma nova reserva de quadra",
      tags: ["Reserva"],
      body: schemaCreateSchedule,
      response: {
 
        400: z.object({ message: z.string() }),
      },
    },
  }, createScheduleController);

  // GET (via body)
  app.post("/schedules/get", {
    schema: {
      description: "Busca uma reserva por ID",
      tags: ["Reserva"],
      body: z.object({ id: z.string() }),
      response: {
        200: schemaScheduleResponse,
        400: z.object({ message: z.string() }),
      },
    },
  }, getScheduleController);

  // UPDATE
  app.put("/schedules/update", {
    schema: {
      description: "Atualiza dados de uma reserva",
      tags: ["Reserva"],
      body: schemaUpdateSchedule,
      response: {
        200: schemaScheduleResponse,
        400: z.object({ message: z.string() }),
      },
    },
  }, updateScheduleController);

  // DELETE
  app.post("/schedules/delete", {
    schema: {
      description: "Remove uma reserva de quadra",
      tags: ["Reserva"],
      body: z.object({
        id: z.string()
      }),
      response: {
        204: z.null(),
        400: z.object({ message: z.string() }),
      },
    },
  }, deleteScheduleController);
}
