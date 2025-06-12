import { makeCreateScheduleUseCase } from "@/domain/reservation/@factories/make-create-schedule-use-case";
import { CreateScheduleUseCase } from "@/domain/reservation/use-cases/create-reservation-use-case";
import { HttpStatusCode } from "axios";
import z from "zod";



export const schemaCreateSchedule = z.object({
  dataHoraInicio: z.string().datetime(),
  dataHoraFim: z.string().datetime(),
  status: z.string(),
  userId: z.string(),
  courtId: z.string(),
});


export async function createScheduleController(req: FastifyRequest, res: FastifyReply) {

  try {
    const { dataHoraInicio, dataHoraFim, status, userId, courtId } = schemaCreateSchedule.parse(req.body);


    const createScheduleUseCase = makeCreateScheduleUseCase();
    const { schedule } = await createScheduleUseCase.execute({
    dataHoraInicio,
    dataHoraFim,
    status,
    userId,
    courtId
    });


    return res.status(HttpStatusCode.Created).send(schedule);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }
    throw error;
  }
}