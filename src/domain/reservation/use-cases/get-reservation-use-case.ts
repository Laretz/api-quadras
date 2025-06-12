import { Schedule } from "@prisma/client";

interface GetSheduleUseCaseRequest{
    id: string;
}

interface GetSheduleUseCaseResponse{
    scheduling: Schedule;
}

export class GetScheduleUseCase{
    constructor (private scheduleRepository: ScheduleRepository){}

    async execute(id: string): Promise<GetSheduleUseCaseResponse>{
        const scheduling = await this.scheduleRepository.getSchedule();
        return {scheduling};
    }
}