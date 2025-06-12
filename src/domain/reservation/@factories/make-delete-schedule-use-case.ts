import { DeleteScheduleUseCase } from "../use-cases/delete-reservation-use-case";


export function makeDeleteScheduleUseCase() {
  const scheduleRepository = new PrismaScheduleRepository();
  return new DeleteScheduleUseCase(scheduleRepository);
}
