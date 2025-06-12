import { GetScheduleUseCase } from "../use-cases/get-reservation-use-case";


export function makeGetScheduleUseCase() {
  const scheduleRepository = new PrismaScheduleRepository();
  return new GetScheduleUseCase(scheduleRepository);
}
