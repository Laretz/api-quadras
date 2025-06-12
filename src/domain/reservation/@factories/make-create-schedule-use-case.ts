import { CreateScheduleUseCase } from "../use-cases/create-reservation-use-case";


export function makeCreateScheduleUseCase(){
    const scheduleRepository = new PrismaScheduleRepository()
    return new CreateScheduleUseCase(scheduleRepository);
}