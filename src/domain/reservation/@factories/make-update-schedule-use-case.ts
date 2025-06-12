import { UpdateScheduleUseCase } from "../use-cases/update-reservation-use-case";



export function makeUpdateScheduleUseCase() {
  const scheduleRepository = new PrismaScheduleRepository();
  return new UpdateScheduleUseCase(scheduleRepository);
}
